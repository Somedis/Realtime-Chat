from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Message
from .serializers import GetRoomForListSerializer


@receiver(post_save, sender=Message)
def model_change_handler(sender, instance, created, **kwargs):
    if created:
        room = instance.room
        serial_room = GetRoomForListSerializer(instance=room)
        for user in room.current_users.all():
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f"user_{user.id}",
                {
                    "type": "send_model_update",
                    "room_id": room.id,
                    "room_name": room.name,
                    "last_message": serial_room.data['last_message']
                },
            )
