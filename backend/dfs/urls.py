from django.urls import path

from . import views

app_name = 'dfs'

urlpatterns = [
    # path('datasets', views.datasets, name='dataset'),
    path(r'datasets/', views.DatasetList.as_view()),
    path('datasets/<int:datasetid>', views.DatasetDetail.as_view()),
    path(r'tempdatasets/', views.TempdatasetList.as_view()),
    path('tempdatasets/<int:datasetid>', views.TempdatasetDetail.as_view()),
    path(r'versions/', views.VersionList.as_view()),
    path('accept/<int:datasetid>', views.accept_tempdataset),
    path('reject/<int:datasetid>', views.reject_tempdataset),
]
