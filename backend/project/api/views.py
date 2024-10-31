from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.core.files.storage import default_storage, FileSystemStorage
from PIL import Image as PilImage
from .models import UploadedFiles

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

## Maybe consider compressing the image before saving it and decompress it after using it
@api_view(['POST'])
def upload_image(request):
    print(request.FILES)
    if 'fileUpload' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
    file = request.FILES['fileUpload']
    upload_image = UploadedFiles(image=file)
    upload_image.save()
    return Response({"message": "Image uploaded successfully."}, status=status.HTTP_201_CREATED)
    
@api_view(['POST'])
def post_message(request):
    if 'message' in request.data:
        message = request.data
        print('Received message:', message)
        return Response({"message": "Message received."}, status=status.HTTP_201_CREATED)
   
    return Response({"error": "No message provided."}, status=status.HTTP_400_BAD_REQUEST)