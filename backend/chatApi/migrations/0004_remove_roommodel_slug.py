# Generated by Django 4.2.2 on 2023-09-04 12:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatApi', '0003_rename_room_roommodel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roommodel',
            name='slug',
        ),
    ]
