from django.db import models

def upload_path(instance, filename):
    return '/'.join(['images', filename])

class UploadedFiles(models.Model):
    id = models.AutoField(primary_key=True)
    filename = models.CharField(max_length=255, blank=True)
    file_size = models.IntegerField(default=0)
    description = models.CharField(max_length=255, blank=True)
    date_of_upload = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name