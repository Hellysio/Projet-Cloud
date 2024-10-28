from django.shortcuts import render
from django.http import JsonResponse, HttpResponse

# Create your views here.
def send_info(request):
    # Sample data you want to send back to Angular
    data = {
        'message': 'Hello from Django!',
        'status': 'success',
        'data': {
            'info': 'Some important information here.'
        }
    }
    return JsonResponse(data)