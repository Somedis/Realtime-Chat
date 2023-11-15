from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)


class UserAccountManager(BaseUserManager):

    def create_user(self, email, login, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            login=login,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, login, password=None):
        user = self.create_user(
            email=email,
            password=password,
            login=login
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):

    login = models.CharField(unique=True, max_length=128)
    email = models.EmailField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["login"]

    def __str__(self) -> str:
        return self.email
