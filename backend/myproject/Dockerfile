FROM python:3.12-alpine AS builder
WORKDIR /app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt --no-cache-dir
COPY . .
EXPOSE 8000
CMD ["python3", "manage.py", "runserver"]

