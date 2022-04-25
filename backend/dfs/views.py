from copy import copy
from email.headerregistry import Group
from pyexpat import model
import re
from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import models
from backend.storage_backends import PrivateMediaStorage, PublicMediaStorage

from user.permissions import IsAdminOrPublisherUser, IsAdminUser, IsPublisherUser

from .serializers import DatasetSerializer, Temporary_datasetSerializer, PublicationSerializer, VersionSerializer
from .models import Dataset, Temporary_dataset, Publication, Version
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import Group
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class DatasetList(APIView):

    permission_classes = [
        IsAdminUser | ReadOnly
    ]

    def get(self, request, format=None):
        datasets = Dataset.objects.all()
        if request.user.is_authenticated:
            is_publisher = request.user.groups == Group.objects.get(
                name='Publisher')
            if is_publisher:
                datasets = datasets.filter(publisher=request.user)
        datasets = DatasetSerializer(datasets, many=True).data
        return Response(datasets)

    # def post(self, request, format=None):
    #     data = request.data
    #     dataset = data.get('dataset')
    #     # publications = data.get('publications')
    #     version = data.get('version')

    #     dataset_serializer = DatasetSerializer(data=dataset)
    #     if dataset_serializer.is_valid():
    #         dataset_serializer.save()
    #         dataset = Dataset.objects.get(name=dataset['name'])
    #         try:
    #             # serialized_publications = []
    #             # for publication in publications:
    #             #     publication_serializer = PublicationSerializer(
    #             #         data=publication)
    #             #     if publication_serializer.is_valid():
    #             #         publication_serializer.save(dataset=dataset)
    #             #         serialized_publications.append(
    #             #             publication_serializer.data)
    #             version_serializer = VersionSerializer(data=version)
    #             if version_serializer.is_valid():
    #                 version_serializer.save(dataset=dataset)
    #             dataset = dataset_serializer.data
    #             # dataset['publications'] = serialized_publications
    #             dataset['version'] = version_serializer.data
    #             return Response(dataset, status=status.HTTP_201_CREATED)
    #         except:
    #             dataset.delete()
    #     return Response(dataset_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        dataset = Dataset.objects.get(id=datasetid)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DatasetDetail(APIView):

    permission_classes = [
        IsAdminOrPublisherUser | ReadOnly
    ]

    def get_object(self, datasetid, user):
        try:
            dataset = Dataset.objects.get(id=datasetid)
            if user is not None:
                is_publisher = user.groups == Group.objects.get(
                    name='Publisher')
                if is_publisher:
                    if dataset.publisher != user:
                        raise Http404
            return dataset

        except Dataset.DoesNotExist:
            raise Http404

    def get(self, request,  datasetid, format=None):

        user = None if not request.user.is_authenticated else request.user

        dataset = self.get_object(datasetid, user)

        # publications = Publication.objects.filter(dataset=dataset)
        versions = Version.objects.filter(dataset=dataset)

        dataset = DatasetSerializer(dataset).data

        #publisher = settings.AUTH_USER_MODEL.objects.get(id=dataset.publisher)
        #print("publisher::::::::::::::::", publisher)
        # dataset["publications"] = PublicationSerializer(
        #     publications, many=True).data
        dataset["versions"] = VersionSerializer(versions, many=True).data

        return Response(dataset)

    def put(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid, request.user)

        serializer = DatasetSerializer(dataset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid, request.user)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TempdatasetList(APIView):

    permission_classes = [
        IsAdminOrPublisherUser
    ]

    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        dataset_status = request.query_params.get('status', None)

        is_publisher = request.user.groups == Group.objects.get(
            name='Publisher')

        temporary_datasets = Temporary_dataset.objects.all()

        if dataset_status:
            if dataset_status not in ['P', 'R']:
                # send 400
                return Response(status=status.HTTP_400_BAD_REQUEST)
            temporary_datasets = temporary_datasets.filter(status=dataset_status)

        if request.user.is_superuser:
            temporary_datasets = temporary_datasets.filter(status='R')

        if is_publisher:
            temporary_datasets = temporary_datasets.filter(
                publisher=request.user)

        temporary_datasets = Temporary_datasetSerializer(
            temporary_datasets, many=True).data

        return Response(temporary_datasets)

    def post(self, request, format=None):

        data = request.data.copy()
        data['publisher'] = request.user.id

        dataset_serializer = Temporary_datasetSerializer(data=data)

        if dataset_serializer.is_valid():
            dataset_serializer.save()
            return Response(dataset_serializer.data, status=status.HTTP_201_CREATED)
        return Response(dataset_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        is_publisher = request.user.groups == Group.objects.get(
            name='Publisher')

        dataset = Temporary_dataset.objects.get(id=datasetid)

        if is_publisher:
            if dataset.publisher != request.user:
                return Response(status=status.HTTP_403_FORBIDDEN)

        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TempdatasetDetail(APIView):

    permission_classes = [
        IsAdminOrPublisherUser
    ]

    def get_object(self, datasetid, user):
        try:
            dataset = Temporary_dataset.objects.get(id=datasetid)
            is_publisher = user.groups == Group.objects.get(
                name='Publisher')
            if is_publisher:
                if dataset.publisher != user:
                    return Response(status=status.HTTP_403_FORBIDDEN)
            return dataset
        except Temporary_dataset.DoesNotExist:
            raise Http404

    def get(self, request,  datasetid, format=None):

        dataset = self.get_object(datasetid, request.user)

        print("dataset\n", dataset)
        dataset = Temporary_datasetSerializer(dataset).data
        return Response(dataset)

    def put(self, request, datasetid, format=None):

        dataset = self.get_object(datasetid, request.user)
        # for key, value in request.data.items():
        #     setattr(dataset, key, value)
        serializer = Temporary_datasetSerializer(dataset, data=request.data)
        # serializer = Temporary_dataset(dataset, request.user)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid, request.user)

        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VersionList(APIView):

    permission_classes = [
        IsPublisherUser | ReadOnly
    ]

    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):

        dataset = request.query_params.get('dataset', None)

        # if user is logged in then it is publisher

        if dataset:
            if request.user.is_authenticated:
                dataset = Dataset.objects.get(id=dataset)
                if dataset.publisher != request.user:
                    return Response(status=status.HTTP_403_FORBIDDEN)

            try:
                versions = Version.objects.filter(dataset=dataset)
                versions = VersionSerializer(versions, many=True).data
                return Response(versions)
            except Version.DoesNotExist:
                return Http404
        versions = Version.objects.all()
        versions = VersionSerializer(versions, many=True).data
        return Response(versions)

    def post(self, request, format=None):

        
        dataset = Dataset.objects.get(id=request.data.get('dataset'))

        if dataset.publisher != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        version_number = Version.objects.filter(dataset=dataset).count() + 1

        storage = PublicMediaStorage()
        file = request.FILES['reference']

        

        version = {
            'dataset': dataset.id,
            'version': version_number,
            'comment': request.data.get('comment'),
            'reference': file,
        }


        version_serializer = VersionSerializer(data= version)
        if version_serializer.is_valid():
            version_serializer.save()
            return Response(version_serializer.data, status=status.HTTP_201_CREATED)
        return Response(version_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, versionid, format=None):
        version = Version.objects.get(id=versionid)

        if version.dataset.publisher != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        version.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
# only admin can create a new dataset
@permission_classes((IsAdminUser,))
def accept_tempdataset(request, datasetid):

    try:
        temporary_dataset = Temporary_dataset.objects.get(id=datasetid)
    except Temporary_dataset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    dataset = {
        'name': temporary_dataset.name,
        'description': temporary_dataset.description,
        'source': temporary_dataset.source,
        'publisher': temporary_dataset.publisher.id,
        'date': temporary_dataset.date
    }


    dataset_serializer = DatasetSerializer(data=dataset)

    if dataset_serializer.is_valid():
        dataset = dataset_serializer.save()
        serialized_dataset = dataset_serializer.data
        try:
            from storages.backends.s3boto3 import S3Boto3Storage
            storage = PrivateMediaStorage()
            # file = storage.open(settings.PRIVATE_MEDIA_LOCATION+'/'+  temporary_dataset.reference.name)
            file = storage.open(temporary_dataset.reference.name)
            
            # storage = PublicMediaStorage()
            # storage.save(settings.PUBLIC_MEDIA_LOCATION+'/'+temporary_dataset.reference.name, file)
            # file.close()
            # reference = storage.url(settings.PUBLIC_MEDIA_LOCATION+'/'+ temporary_dataset.reference.name)
            # print("reference", reference)
            version = {
                'dataset': serialized_dataset['id'],
                'version': 1,
                'comment': 'Initial version',
                'date': temporary_dataset.date,
                'reference':  file,
            }

            version_serializer = VersionSerializer(data=version)
            if version_serializer.is_valid():
                version_serializer.save()
                version = version_serializer.data
                serialized_dataset['versions'] = [version]
                # delete temporary dataset
                storage = PrivateMediaStorage()
                temporary_dataset.delete()
                return Response(serialized_dataset, status=status.HTTP_201_CREATED)
            else:
                dataset.delete()
                return Response(version_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print("error", e)
            dataset.delete()
            return Response(status=status.HTTP_400_BAD_REQUEST)
    return Response(dataset_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((IsAdminUser,))
def reject_tempdataset(request, datasetid):

    try:
        temporary_dataset = Temporary_dataset.objects.get(id=datasetid)
    except Temporary_dataset.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    temporary_dataset.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
