import json

from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer
from djangochannelsrestframework.observer import model_observer
from djangochannelsrestframework.observer.generics import (
    ObserverModelInstanceMixin, action
    )

from .models import Message, RoomModel
from .serializers import (GetRoomSerializer, GetMessageSerializer,
                          GetRoomForListSerializer)
from userApi.serializers import UserSerializer
from .mixins import GetMessagesMixin, GetUsersMixin

User = get_user_model()


class RoomConsumer(
                    ObserverModelInstanceMixin,
                    GenericAsyncAPIConsumer,
                    GetMessagesMixin
                    ):

    queryset = RoomModel.objects.all()
    serializer_class = GetRoomSerializer
    lookup_field = "pk"

    async def disconnect(self, code):
        if hasattr(self, "room_subscribe"):
            # await self.remove_user_from_room(self.room_subscribe)
            await self.notify_users()
        await super().disconnect(code)

    @action()
    async def join_room(self, pk, **kwargs):
        self.room_subscribe = pk
        await self.add_user_to_room(pk)
        await self.notify_users()

    @action()
    async def leave_room(self, pk, **kwargs):
        await self.remove_user_from_room(pk)

    @action()
    async def create_message(self, message, **kwargs):
        room: RoomModel = await self.get_room(pk=self.room_subscribe)
        await database_sync_to_async(Message.objects.create)(
            room=room,
            user=self.scope["user"],
            text=message
        )

    @action()
    async def subscribe_to_messages_in_room(self, pk, **kwargs):
        await self.message_activity.subscribe(room=pk)

    @model_observer(Message)
    async def message_activity(self, message, observer=None, **kwargs):
        await self.send_json(message)

    @message_activity.groups_for_signal
    def message_activity(self, instance: Message, **kwargs):
        yield f'room__{instance.room_id}'
        yield f'pk__{instance.pk}'

    @message_activity.groups_for_consumer
    def message_activity(self, room=None, **kwargs):
        if room is not None:
            yield f'room__{room}'

    @message_activity.serializer
    def message_activity(self, instance: Message, action, **kwargs):
        return dict(
                    data=GetMessageSerializer(instance).data,
                    action=action.value, pk=instance.pk
                )

    async def notify_users(self):
        room: RoomModel = await self.get_room(self.room_subscribe)
        for group in self.groups:
            await self.channel_layer.group_send(
                group,
                {
                    'type': 'update_users',
                    'usuarios': await self.current_users(room)
                }
            )

    async def update_users(self, event: dict):
        await self.send(text_data=json.dumps({'usuarios': event["usuarios"]}))

    @database_sync_to_async
    def get_room(self, pk: int) -> RoomModel:
        return RoomModel.objects.get(pk=pk)

    @database_sync_to_async
    def current_users(self, room: RoomModel):
        return [UserSerializer(user).data for user in room.current_users.all()]

    @database_sync_to_async
    def remove_user_from_room(self, room):
        user: User = self.scope["user"]
        user.current_rooms.remove(room)

    @database_sync_to_async
    def add_user_to_room(self, pk):
        user: User = self.scope["user"]
        print(self.scope["user"])
        if not user.current_rooms.filter(pk=self.room_subscribe).exists():
            user.current_rooms.add(RoomModel.objects.get(pk=pk))


class UserConsumer(
                    ObserverModelInstanceMixin,
                    GenericAsyncAPIConsumer,
                    GetUsersMixin
                ):

    queryset = RoomModel.objects.all()
    serializer_class = GetRoomForListSerializer
    lookup_field = "pk"

    async def connect(self):
        self.user_id = self.scope['user']
        await self.channel_layer.group_add(
            f'user_{self.user_id.pk}',
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            f'user_{self.user_id}',
            self.channel_name
        )

    async def send_model_update(self, event):
        room_id = event['room_id']
        room_name = event['room_name']
        last_message = event['last_message']
        data = {
            'pk': room_id,
            'name': room_name,
            'last_message': last_message
        }
        action_handler = 'update_data'

        await self.send(text_data=json.dumps({
            'data': data,
            'action': action_handler
        }))
