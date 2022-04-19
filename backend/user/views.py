import email
from lib2to3.pytree import Base
from sys import api_version
from MySQLdb import IntegrityError
from django.forms import ValidationError
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet, ModelViewSet
from rest_framework.permissions import AllowAny
from user.permissions import *
from user.models import User
from user.serializer import UserSerializer
from rest_framework.decorators import api_view, permission_classes
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAdminUser]
        elif self.action == 'list':
            permission_classes = [IsAdminOrPublisherUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin]
        elif self.action == 'destroy':
            permission_classes = [IsLoggedInUserOrAdmin]
        return [permission() for permission in permission_classes]


@api_view(['POST'])
@permission_classes([AllowAny])
def User_register(request):
    try:
        data = {}
        # if request.data.get('group') == 'admin':
        #     request.data['group'] = Group.objects.get(name='admin')
        # elif request.data.get('group') == 'publisher':
        #     request.data['group'] = Group.objects.get(name='publisher')
        # else:
        #     return Response({"message": "group is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            account = serializer.save()
            account.is_active = True
            # TODO
            if request.data.get('groups') == 'publisher':
                account.groups = Group.objects.get(name='publisher')
            account.save()
            token = Token.objects.get_or_create(user=account)[0].key

            data["message"] = "Account created successfully."
            data["email"] = account.email
            data["first_name"] = account.first_name
            data["last_name"] = account.last_name
            data["username"] = account.username

            data["token"] = token
            data["groups"] = str(account.groups)
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)
        
    except IntegrityError as e:
        account = User.objects.get(username='')
        account.delete()
        return Response({"message": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
    except KeyError as e:
        print(e)
        return Response({"message": f'Field {str(e)} missing.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([AllowAny])
def User_login(request):
    data = {}
    email = request.data.get('email')
    print("email: ", email)
    password = request.data.get('password')
    try:
        account = User.objects.get(email=email)
    except BaseException as e:
        return Response({
            "message": 'Account does not exist.'
        }, status=status.HTTP_400_BAD_REQUEST)
    token = Token.objects.get_or_create(user=account)[0].key
    print("token: ", token)
    if not check_password(password, account.password):
        return Response({
            "message": "Invalid credentials"
        }, status=status.HTTP_400_BAD_REQUEST)

    if account:
        if account.is_active:
            print(request.user)
            login(request, account)
            data["message"] = "Login successful."
            data["email"] = account.email
            data["username"] = account.username
            data["token"] = token
            data["first_name"] = account.first_name
            data["last_name"] = account.last_name
            data["group"] = str(account.groups)
            data["id"] = account.id
            return Response(data)
        else:
            return Response({
                "message": "Account is not active."
            }, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({
            "message": "Account does not exist."
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def User_logout(request):

    request.user.auth_token.delete()

    logout(request)

    return Response('User Logged out successfully')
