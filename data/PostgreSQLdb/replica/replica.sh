#!/bin/bash
set -e

echo "port = $REPLICA_PORT" >> "$PGDATA/postgresql.conf"
echo "listen_addresses = '*'" >> "$PGDATA/postgresql.conf"

echo "max_connections = 5" >> "$PGDATA/postgresql.conf"
echo "wal_level = replica" >> "$PGDATA/postgresql.conf"
echo "max_wal_senders = 5" >> "$PGDATA/postgresql.conf"
echo "hot_standby = on" >> "$PGDATA/postgresql.conf"

echo "host replication $REPLICATION_USER 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"

echo "POSTGRES_PORT: $REPLICA_PORT"
echo "PGDATA: $PGDATA"
echo "REPLICATION_USER: $REPLICATION_USER"

pg_ctl -D "$PGDATA" -o "-p $REPLICA_PORT" -m fast -w restart
