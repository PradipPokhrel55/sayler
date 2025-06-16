from django.urls import path, include
from .views import initiate_payment,payment_callback,verify_khalti_payment
from . import views


urlpatterns = [
    path('initiate/',views.initiate_payment, name='initiate_payment'),
    path('callback/',views.payment_callback, name='payment_callback'),
    path('khalti/initiate/',views.verify_khalti_payment, name='khalti_payment'),
]
