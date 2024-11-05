from django.utils import timezone 
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.core.files.storage import default_storage, FileSystemStorage
from dotenv import load_dotenv
from .models import UploadedFiles
import requests

## Maybe consider consider using a dot env file to store the API key and all the db info
@api_view(['POST'])
def upload_image(request):
    # print('Request:', request)
    # print('Request data:', request.data)
    # print('list', request.FILES.getlist('fileUpload'))

    if 'fileUpload' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['fileUpload']
    request_time = timezone.now()
    
    API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
    headers = {"Authorization": f"Bearer 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"}

    try:
        response = requests.post(API_URL, headers=headers, data=file)
        response.raise_for_status()
        api_response = response.json()

        description = api_response[0].get('generated_text')

        # Saving data about the file in the postgreSQL database
        upload_image = UploadedFiles(filename=file.name,
                                     file_size=file.size,
                                     description=description,
                                     date_of_upload=request_time
                                    )
        upload_image.save()
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return Response({"error": "Error processing image from API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(api_response, status=status.HTTP_201_CREATED)

# Create your views here.
def send_info(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success',
        'data': {
            'info': 'Some important information here.'
        }
    }
    return JsonResponse(data)

@api_view(['POST'])
def post_message(request):
    if 'message' in request.data:
        message = request.data
        print('Received message:', message)
        return Response({"message": "Message received."}, status=status.HTTP_201_CREATED)
   
    return Response({"error": "No message provided."}, status=status.HTTP_400_BAD_REQUEST)