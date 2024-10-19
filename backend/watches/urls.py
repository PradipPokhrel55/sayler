from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WatchViewSet

router = DefaultRouter()
router.register(r'',WatchViewSet,basename='watches')

urlpatterns = [
    path('',include(router.urls)),
]
