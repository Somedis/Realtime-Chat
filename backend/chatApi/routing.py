from django.urls import re_path
from .consumers import RoomConsumer, UserConsumer


websocket_urlpatterns = [
    re_path(r'ws/chat/room/(?P<room_name>\w+)/$', RoomConsumer.as_asgi()),
    re_path(r'ws/chat/', UserConsumer.as_asgi()),
]
