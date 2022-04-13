from rest_framework.routers import DefaultRouter
from django.urls import path, include

from user import views


from .custom_auth_token import CustomAuthToken


router = DefaultRouter()
router.register('users', views.UserViewSet, basename='users')
router.register('login', views.LoginView, basename='login')


urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('account/logout/', views.LogoutView.as_view(), name='logout')
]
