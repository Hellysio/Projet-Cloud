FROM postgres:17-alpine

WORKDIR /app

ENV REPLICA_PORT=5434
ENV MASTER_HOST=master_db
ENV MASTER_PORT=5433

ENV REPLICATION_USER=replication

ENV POSTGRES_DB=DescriptionDB
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_BACKUP=/var/lib/postgresql/data

ENV PGDATA=/var/lib/postgresql/data

COPY /replica.sh /docker-entrypoint-initdb.d/
COPY /rep.sh /docker-entrypoint-initdb.d/

EXPOSE 5434

