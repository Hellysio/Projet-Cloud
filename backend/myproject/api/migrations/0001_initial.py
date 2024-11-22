# Generated by Django 5.1.2 on 2024-11-22 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='descriptiontb',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('filename', models.CharField(blank=True, max_length=255)),
                ('file_size', models.IntegerField(default=0)),
                ('description', models.CharField(blank=True, max_length=255)),
                ('date_of_upload', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'descriptiontb',
            },
        ),
    ]
