FROM postgres:17-alpine

WORKDIR /app

ENV POSTGRES_DB=DescriptionDB
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=postgres
ENV PGDATA=/var/lib/postgresql/data

COPY /conf/postgresql.conf /etc/postgresql/postgresql.conf
CMD [ "postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

COPY /replica.sh /app/replica.sh
RUN chmod +x /app/replica.sh

EXPOSE 5434

