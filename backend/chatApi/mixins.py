from typing import Tuple

from rest_framework import status
from rest_framework.utils.serializer_helpers import ReturnList
from djangochannelsrestframework.decorators import action

from .serializers import GetRoomSerializer


class GetMessagesMixin:

    @action()
    def get_messages(self, pk, **kwargs) -> Tuple[ReturnList, int]:
        queryset = (self.get_queryset(**kwargs)).filter(pk=pk)
        serializer = GetRoomSerializer(instance=queryset, many=True)
        return serializer.data, status.HTTP_200_OK


class GetUsersMixin:

    @action()
    def get_users(self, pk, **kwargs):
        queryset = (self.get_queryset(**kwargs)).filter(current_users__id=pk)
        serializer = self.get_serializer(
            instance=queryset, many=True, action_kwargs=kwargs
            )
        return serializer.data, status.HTTP_200_OK


class GetLastMessageMixin:

    @action()
    def get_last_message(self, **kwargs):
        pass
