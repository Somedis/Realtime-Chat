from django.db import models
from django_extensions.db.fields import AutoSlugField


class RoomModel(models.Model):

    name = models.CharField(
        max_length=255, null=False, blank=False, unique=True
    )
    host = models.ForeignKey(
        'userApi.UserAccount', on_delete=models.CASCADE, related_name='rooms'
        )
    current_users = models.ManyToManyField(
        'userApi.UserAccount', related_name='current_rooms', blank=True
    )
    slug = AutoSlugField(max_length=255, unique=True, populate_from=['name'])

    def __str__(self) -> str:
        return f'Room({self.name} - {self.host})'


class Message(models.Model):

    room = models.ForeignKey(
        RoomModel, on_delete=models.CASCADE, related_name='messages'
    )
    text = models.TextField(max_length=500)
    user = models.ForeignKey(
        'userApi.UserAccount', on_delete=models.CASCADE,
        related_name='messages'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'Message({self.user} - {self.room})'
