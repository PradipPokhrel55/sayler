from django.urls import include,path
from rest_framework.routers import DefaultRouter
from .views import fasionviewset

router = DefaultRouter()
router.register(r'',fasionviewset,basename='fashion')

urlpatterns = [
    path('',include(router.urls)),
]
