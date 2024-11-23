from django.shortcuts import render
import time
# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests


from django.http import JsonResponse
import requests

def initiate_payment(request):
    if request.method == 'POST':
        total_amount = request.POST.get('amount')
        pid = f'TXN-{int(time.time())}'
        success_url = 'http://localhost:3000/payment-success'
        failure_url = 'http://localhost:3000/payment-failure'

        esewa_url = f"https://esewa.com.np/epay/main?amt={total_amount}&pdc=0&psc=0&tAmt={total_amount}&pid={pid}&su={success_url}&fu={failure_url}&scd=merchantCodeHere"

        return JsonResponse({'url': esewa_url})







@csrf_exempt
def payment_callback(request):
    if request.method == 'GET':
        order_id = request.GET.get('oid')
        status = request.GET.get('status')


        return JsonResponse({'status': status})
    




def verify_khalti_payment(request):
    token = request.POST.get("token")
    amount = request.POST.get("amount")

    if token and amount:
        url = "https://khalti.com/api/v2/payment/verify/"
        payload = {
            "token": token,
            "amount": amount
        }
        headers = {
            "Authorization": "Key YOUR_SECRET_KEY_HERE"
        }

        response = requests.post(url, data=payload, headers=headers)
        return JsonResponse(response.json())

    return JsonResponse({"error": "Missing token or amount"})

