from django.urls import path, include
from .views import salesview
from rest_framework.routers import DefaultRouter

routers=DefaultRouter()
routers.register(r'',salesview,basename='sales')

urlpatterns = [
    path('',include(routers.urls)),
]
