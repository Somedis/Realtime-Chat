from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'login', 'password']

    def validate(self, data):
        user = User(**data)
        password = data.get('password')

        try:
            validate_password(password=password, user=user)
        except ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise ValidationError(
                {"password": serializer_errors('non_fields_errors')}
            )

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            login=validated_data['login'],
            password=validated_data['password']
        )

        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'login', 'pk']
