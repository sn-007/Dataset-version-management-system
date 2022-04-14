from rest_framework.routers import DefaultRouter
from django.urls import path, include

from user import views


from .custom_auth_token import CustomAuthToken


urlpatterns = [
    path('register/', views.User_register, name='register'),
    path('login/', views.User_login, name='login'),
    path('logout/', views.User_logout, name='logout'),
    # path('api-token-auth/', CustomAuthToken.as_view()),
]
