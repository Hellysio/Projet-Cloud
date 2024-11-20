FROM postgres:14-alpine

WORKDIR /app

ENV POSTGRES_DB=DescriptionDB
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=postgres

COPY /postgresql.conf /etc/postgresql/postgresql.conf
CMD [ "postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]

COPY /master.sh /app/master.sh
RUN chmod +x /app/master.sh

EXPOSE 5433

