from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.files.storage import default_storage, FileSystemStorage
from PIL import Image as PilImage
from .models import UploadedFiles

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

## Maybe consider compressing the image before saving it and decompress it after using it
@api_view(['POST'])
def upload_image(request):
    if (request.method == 'POST'):
        file = request.FILES['image']
        if file:
            fs = FileSystemStorage()
            file = fs.save(request.FILES['image'].name, request.FILES['image'])
            file_url = fs.url(file)
            return Response({"message": "File uploaded successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "No file found!"}, status=status.HTTP_400_BAD_REQUEST)
