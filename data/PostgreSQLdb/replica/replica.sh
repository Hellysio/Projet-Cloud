#!/bin/bash

until pg_isready -h "$REPLICATE_FROM" -p 5432; do
  echo "Waiting for master database to be ready..."
  sleep 2
done

pg_ctl -D "$PGDATA" -m fast -w stop

rm -rf "$PGDATA"/*
PGPASSWORD=postgres pg_basebackup -h "$REPLICATE_FROM" -D "$PGDATA" -U replica -v -P --wal-method=stream

echo "standby_mode = 'on'" > "$PGDATA/recovery.conf"
echo "primary_conninfo = 'host=$REPLICATE_FROM port=5432 user=replica password=replica_pass'" >> "$PGDATA/recovery.conf"
echo "trigger_file = '/tmp/failover.trigger'" >> "$PGDATA/recovery.conf"

pg_ctl -D "$PGDATA" -w start
