from django.db import models

def upload_path(instance, filename):
    return '/'.join(['images', filename])

class UploadedFiles(models.Model):
    image = models.ImageField(upload_to=upload_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name

