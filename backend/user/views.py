
from rest_framework.authtoken.models import Token  
from rest_framework_simplejwt.tokens import RefreshToken  
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer


from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json



class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            user = User.objects.get(username=response.data['username'])
        
        
            token, created = Token.objects.get_or_create(user=user)
        
            refresh = RefreshToken.for_user(user)
        
        
            return Response({
                'message': 'Registration successful!',
                'user': response.data,
                'token': str(token.key),             
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Registration error:",e)
            return Response({
                'error':'An error occured during registration .Please try again.'
            },status=status.HTTP_500_INTERNAL_SERVER_ERROR)








    



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    
    def post(self, request, *args, **kwargs):
        # Parse JSON data from the request body
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON format'})
        
        username = data.get('username')
        password = data.get('password')

        # Authenticate user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Log in the user
            login(request, user)

            # Set a session for the user, so they remain logged in
            response = JsonResponse({'success': True, 'message': 'Logged in successfully'})
            
            # Set a cookie that lasts for 14 days (2 weeks)
            response.set_cookie('is_logged_in', 'true', max_age=1209600 ,samesite='Lax' , secure=False, path='/')  # 1209600 seconds = 14 days
            return response
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})


