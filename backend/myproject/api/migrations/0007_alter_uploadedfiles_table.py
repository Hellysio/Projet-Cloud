# Generated by Django 5.1.2 on 2024-11-15 11:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_uploadedfiles_table'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='uploadedfiles',
            table='descriptiontb',
        ),
    ]