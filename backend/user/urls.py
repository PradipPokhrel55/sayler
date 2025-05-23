
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path;
from .views import RegisterView ,LoginView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/token/', LoginView.as_view(), name='login'),  
]
