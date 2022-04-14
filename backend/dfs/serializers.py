from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Dataset, Temporary_dataset, Publication, Version


class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('id', 'name', 'description', 'publisher', 'source', 'date')


class Temporary_datasetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Temporary_dataset
        fields = ('id', 'name', 'description', 'publisher', 'source',
                  'reference', 'status', 'date')


class PublicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Publication
        fields = ['id', 'dataset', 'url']


class VersionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Version
        fields = ('id', 'dataset', 'version', 'comment', 'date')
