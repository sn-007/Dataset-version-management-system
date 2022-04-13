import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', './backend/settings.py')


django.setup()


from django.contrib.auth.models import Group

GROUPS = ['admin', 'publisher']

MODELS = ['user']

for group in GROUPS:
    new_group, created = Group.objects.get_or_create(name=group)
