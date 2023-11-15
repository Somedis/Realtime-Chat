from django.apps import AppConfig


class ChatapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chatApi'

    def ready(self) -> None:
        from chatApi import signals
