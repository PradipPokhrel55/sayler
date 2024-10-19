from django.urls import path,include
from .views import ShoesView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'',ShoesView,basename='shoes')

urlpatterns = [
    path('',include(router.urls))
]
