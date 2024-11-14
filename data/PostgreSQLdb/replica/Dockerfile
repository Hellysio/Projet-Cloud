FROM postgres:14.13

WORKDIR /app

ENV POSTGRES_DB=DescriptionDB
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=postgres


COPY /replica.sh /app/replica.sh
RUN chmod +x /app/replica.sh

EXPOSE 5433

