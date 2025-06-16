from django.contrib import admin
from django.urls import path,include
from django.views.generic import RedirectView
from django.conf import settings
'''from django.views.generic import TemplateView
import os'''
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('watches/',include('watches.urls')),
    path('payment/',include('payment.urls')),
    path('shoes/',include('shoes.urls')),
    path('electronics/',include('electronics.urls')),
    path('fashion/',include('fashion.urls')),
    path('sales/',include('sales.urls')),
    path('user/',include('user.urls')),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),

]

if settings.DEBUG:urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
