#!/bin/bash
set -e

if [ $REPLICATION_ROLE = "master" ]; then
    psql -U $POSTGRES_USER -d $POSTGRES_DB -p $MASTER_PORT -c "CREATE USER replicationUser WITH REPLICATION PASSWORD '$POSTGRES_PASSWORD' LOGIN"

elif [ $REPLICATION_ROLE = "slave" ]; then

    pg_ctl -D "$PGDATA" -m fast -w stop
    rm -r "$PGDATA"/*

    pg_basebackup \
         --write-recovery-conf \
         --pgdata="$PGDATA" \
         --wal-method=fetch \
         --username=$REPLICATION_USER \
         --host=$MASTER_HOST \
         --port=$MASTER_PORT \
         --progress \
         --verbose

    pg_ctl -D "$PGDATA" \
         -o "-c listen_addresses=''" \
         -w start
fi

echo [*] $REPLICATION_ROLE instance configured!