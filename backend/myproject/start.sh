#!/bin/bash
#Run the migrations at the start of the container
python3 manage.py showmigrations

python3 manage.py migrate

exec python3 manage.py runserver 0.0.0.0:8000
