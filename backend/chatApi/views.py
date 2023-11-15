from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import RoomModel, Message
from .serializers import RoomSerializer, MessageSerializer

from rest_framework.views import APIView
from rest_framework import status


@api_view(['POST'])
def index(request):
    if request.method == "POST":
        data = request.data
        room = RoomModel.objects.create(
            name=data['name'],
            host_id=data['user_id']
        )
        serializer = RoomSerializer(room, many=False)

        return Response(serializer.data)


class CreateRoomView(APIView):

    def post(request):
        data = request.data

        room = RoomModel.objects.create(
            name=data['name'],
            host_id=data['user_id']
        )
        serializer = RoomSerializer(room, many=False)

        return Response(serializer.data, status=status.HTTP_200_OK)


class RoomView(APIView):

    def get(self, request, slug, format=None):
        try:
            room = RoomModel.objects.get(slug=slug)
            serializer = RoomSerializer(room)
            return Response(serializer.data)
        except RoomModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class MessageView(APIView):

    def get(self, request):
        try:
            message = Message.objects.filter(room=request.query_params['pk'])
            serializer = MessageSerializer(message)
            return Response(serializer.data)
        except Message.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
