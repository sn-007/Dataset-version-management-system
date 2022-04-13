from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import AbstractUser, Group


class User(AbstractUser):
    groups = models.ForeignKey(Group, on_delete=models.CASCADE)
    email = models.EmailField(max_length=50, unique=True)

    REQUIRED_FIELDS = ['groups_id', 'email']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self) -> str:
        return '%s %s' % (self.first_name, self.last_name)

    def get_short_name(self) -> str:
        return self.first_name

    def __str__(self) -> str:
        return self.username
