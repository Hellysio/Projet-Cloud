FROM python:3.12 AS builder

WORKDIR /app

COPY requirements.txt ./
RUN pip3 install -r requirements.txt --no-cache-dir

COPY . .
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8000
ENTRYPOINT ["/app/start.sh"]

