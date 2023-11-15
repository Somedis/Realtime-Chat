from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import RoomModel, Message
from userApi.serializers import UserSerializer


User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    created_at_formatted = serializers.SerializerMethodField()

    class Meta:
        model = Message
        exclude = []
        depth = 1

    def get_created_at_formatted(self, obj: Message):
        return obj.created_at.strftime("%m/%d/%Y, %H:%M:%S")


class RoomSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = RoomModel
        fields = ["pk", "name", "host", "messages", "slug",
                  "current_users", "last_message"]
        depth = 1
        read_only_fields = ["messages", "last_message"]

    def get_last_message(self, obj: RoomModel):
        try:
            keys = ("text", "created_at_formatted", "user")
            user_keys = ("email", "login", "id")
            message_dict = {}
            for val in keys:
                if val == "user":
                    user = {}
                    for value in user_keys:
                        user[value] = MessageSerializer(
                            obj.messages.order_by(
                                'created_at').last()).data[val][value]
                    message_dict[val] = user
                else:
                    message_dict[val] = MessageSerializer(
                        obj.messages.order_by('created_at').last()).data[val]
        except KeyError:
            pass

        return message_dict


class GetMessageSerializer(MessageSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "created_at_formatted", "text", "user", "room"]
        exclude = []
        depth = 1


class GetRoomSerializer(RoomSerializer):
    messages = GetMessageSerializer(many=True, read_only=True)
    current_users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = RoomModel
        fields = ["pk", "messages", "current_users", "last_message"]
        depth = 1
        read_only_fields = ["messages", "last_message"]


class GetRoomForListSerializer(GetRoomSerializer):

    class Meta:
        model = RoomModel
        fields = ["pk", "name", "last_message"]
        depth = 1


class GetLastMessageSerializer(GetRoomSerializer):

    class Meta:
        model = RoomModel
        fields = ["pk", "name", "current_users", "last_message"]
        depth = 1


class GetUserSerializer(RoomSerializer):
    current_rooms = GetLastMessageSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["pk", "login", "current_rooms"]
        depth = 1
