from email.policy import default
from ensurepip import version
from django.db import models
from django.urls import reverse
from django.conf import settings

from backend.storage_backends import PrivateMediaStorage, PublicMediaStorage

# Create your models here.


class Dataset(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    source = models.URLField(max_length=200)
    publisher = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    date = models.DateTimeField(auto_now_add=False, default=None)

    # version
    # publications

    class Meta:
        ordering = ['-date', 'name']

    def get_absolute_url(self):
        return reverse('dfs:dataset-detail', args=[str(self.id)])

    def __str__(self):
        return self.name


class Temporary_dataset(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    publisher = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)

    # source is a url
    source = models.URLField(max_length=200, blank=True)
    # version : latest version number
    # TODO: change name to actual name
    # reference = models.FileField(
    #     upload_to='datasets/{}/0'.format(name), blank=True)
    reference = models.FileField(storage=PrivateMediaStorage(), blank=True)
    date = models.DateTimeField(auto_now_add=True)
    # publications = models.one
    PENDING = 'P'
    REQUESTED = 'R'
    status_choice = [
        (PENDING, 'pending'),
        (REQUESTED, 'requested'),
    ]

    status = models.CharField(
        choices=status_choice,
        max_length=1,
        default=PENDING,
    )

    def get_absolute_url(self):
        return reverse('dfs:temporary_dataset-detail', args=[str(self.id)])

    def __str__(self):
        return "TEMP " + self.name

    class Meta:
        ordering = ['-date', 'name']


class Publication(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    url = models.URLField(max_length=200)

    def _str_(self):
        return self.url


class Version(models.Model):
    id = models.AutoField(primary_key=True)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE)
    # version: latest version number
    version = models.IntegerField(default=1)
    # comment
    comment = models.TextField()
    # reference: reference to object storing the dataset
    reference = models.FileField(storage=PublicMediaStorage())
    # update version number
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['dataset', '-date']

    def update_version(self):
        # get version number from dataset version
        self.dataset.version += 1
        self.version = self.dataset.version
        self.dataset.save()
        self.save()

    def _str_(self):
        return str(self.version)+" "+self.comment
