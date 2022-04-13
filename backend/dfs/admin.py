from django.contrib import admin

# Register your models here.

from .models import Temporary_dataset, Dataset, Publication, Version

class TempDatasetAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'source')

class DatasetAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'source')

class PublicationAdmin(admin.ModelAdmin):
    list_display = ('dataset', 'url')

class VersionAdmin(admin.ModelAdmin):
    list_display = ('dataset', 'version', 'comment')

admin.site.register(Temporary_dataset, TempDatasetAdmin)
admin.site.register(Dataset, DatasetAdmin)
admin.site.register(Publication, PublicationAdmin)