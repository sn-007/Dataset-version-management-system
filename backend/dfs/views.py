from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import DatasetSerializer, Temporary_datasetSerializer, PublicationSerializer, VersionSerializer
from .models import Dataset, Temporary_dataset, Publication, Version

class DatasetList(APIView):

    def get(self, request, format=None):
        datasets = Dataset.objects.all()
        datasets = DatasetSerializer(datasets, many=True).data
        return Response(datasets)

    def post(self, request, format=None):
        data = request.data
        dataset = data.get('dataset')
        publications = data.get('publications')
        version = data.get('version')

        dataset_serializer = DatasetSerializer(data=dataset)
        if dataset_serializer.is_valid():
            dataset_serializer.save()
            dataset = Dataset.objects.get(name=dataset['name'])
            try:
                for publication in publications:
                    publication_serializer = PublicationSerializer(data=publication)
                    if publication_serializer.is_valid():
                        publication_serializer.save(dataset=dataset)
                for version in version:
                    version_serializer = VersionSerializer(data=version)
                    if version_serializer.is_valid():
                        version_serializer.save(dataset=dataset)
                return Response(dataset_serializer.data, status=status.HTTP_201_CREATED)
            except:
                dataset.delete()
        return Response(dataset_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        dataset = Dataset.objects.get(id=datasetid)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DatasetDetail(APIView):

    def get_object(self, datasetid):
        try:
            return Dataset.objects.get(id=datasetid)
        except Dataset.DoesNotExist:
            return Http404


    def get(self,request,  datasetid, format=None):
        dataset = self.get_object(datasetid)
        
        publications = Publication.objects.filter(dataset=dataset)
        versions = Version.objects.filter(dataset=dataset)

        dataset = DatasetSerializer(dataset).data

        dataset["publications"] = PublicationSerializer(publications, many=True).data        
        dataset["versions"] = VersionSerializer(versions, many=True).data
        
        return Response(dataset)
        
    def put(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid)
        serializer = DatasetSerializer(dataset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TempdatasetList(APIView):

    def get(self, request, format=None):

        if request.query_params.get('status'):
            status = request.query_params.get('status')
            if status not in ['pending', 'requested']:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            temporary_datasets = Temporary_dataset.objects.filter(status=status)
            temporary_datasets = Temporary_datasetSerializer(temporary_datasets, many=True).data
            return Response(temporary_datasets)

        temporary_datasets = Temporary_dataset.objects.all()
        temporary_datasets = Temporary_datasetSerializer(temporary_datasets, many=True).data
        return Response(temporary_datasets)

    def post(self, request, format=None):
        dataset_serializer = Temporary_datasetSerializer(data=request.data)
        if dataset_serializer.is_valid():
            dataset_serializer.save()
            return Response(dataset_serializer.data, status=status.HTTP_201_CREATED)
        return Response(dataset_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, datasetid, format=None):
        dataset = Temporary_dataset.objects.get(id=datasetid)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TempsatasetDetail(APIView):

    def get_object(self, datasetid):
        try:
            return Temporary_dataset.objects.get(id=datasetid)
        except Temporary_dataset.DoesNotExist:
            return Http404

    def get(self,request,  datasetid, format=None):
        dataset = self.get_object(datasetid)
        print("DATASET:::::\n", dataset)
        dataset = Temporary_datasetSerializer(dataset).data
        return Response(dataset)
     
    def put(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid)
        serializer = Temporary_dataset(dataset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, datasetid, format=None):
        dataset = self.get_object(datasetid)
        dataset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VersionList(APIView):

    def get(self, request, format=None):

        if request.query_params.get('dataset'):
            dataset = request.query_params.get('dataset')
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
        version_serializer = VersionSerializer(data=request.data)
        if version_serializer.is_valid():
            version_serializer.save()
            return Response(version_serializer.data, status=status.HTTP_201_CREATED)
        return Response(version_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, versionid, format=None):
        version = Version.objects.get(id=versionid)
        version.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def accept_dataset(request, datasetid):
    # TODO: decorate with permissions for route access
    if request.method == 'POST':
        # TODO: remove temp dataset and modify it and add new dataset with new version and new publicaitons 
        pass