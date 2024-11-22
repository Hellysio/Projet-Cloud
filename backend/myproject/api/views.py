from django.utils import timezone 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import descriptiontb
import requests

@api_view(['GET'])
def send_info(request):
    print('Server is running and ready to accept requests.')
    return Response({"message": "Welcome to the Image Captioning API!"})

@api_view(['POST'])
def upload_image(request):
    print('Image upload request received.')
    if 'fileUpload' not in request.FILES:
        print('No file provided.')
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['fileUpload']
    request_time = timezone.now()
    
    API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
    headers = {"Authorization": f"Bearer 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"}

    try:
        print('Sending image to API for processing.')
        response = requests.post(API_URL, headers=headers, data=file)
        response.raise_for_status()
        api_response = response.json()

        description = api_response[0].get('generated_text')

        # Saving data about the file in the postgreSQL database
        upload_image = descriptiontb(filename=file.name,
                                     file_size=file.size,
                                     description=description,
                                     date_of_upload=request_time
                                    )
        upload_image.save()
        print('Image processed and saved in the database!')
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return Response({"error": "Error processing image from API."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(api_response, status=status.HTTP_201_CREATED)