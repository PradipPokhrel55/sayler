from .views import electronicsview
from django.urls import path,include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'',electronicsview)

urlpatterns = [
    path('',include(router.urls))
]
