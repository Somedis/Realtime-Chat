from django.urls import path

from .views import index, RoomView, MessageView


urlpatterns = [
    path('', index, name='some'),
    path('room/<slug:slug>/', RoomView.as_view(), name='room'),
    path('messages/<str:pk>/', MessageView.as_view(), name='message_list')
]
