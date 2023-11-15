import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from chatApi import routing
from chatApi.middleware import JwtAuthMiddlewareStack


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.base")

django_asgi_application = get_asgi_application()

application = ProtocolTypeRouter(
    {
        'http': django_asgi_application,
        'websocket': JwtAuthMiddlewareStack(
            URLRouter(routing.websocket_urlpatterns)
            )
    }
)
