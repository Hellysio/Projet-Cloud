FROM postgres:17-alpine

WORKDIR /app
ENV REPLICATION_ROLE=master
ENV MASTER_HOST=master_db
ENV MASTER_PORT=5433
ENV POSTGRES_DB=DescriptionDB

ENV REPLICATION_USER=replication

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=postgres

ENV PGDATA=/var/lib/postgresql/data

COPY /master.sh /docker-entrypoint-initdb.d/
COPY /rep.sh /docker-entrypoint-initdb.d/

EXPOSE 5433


