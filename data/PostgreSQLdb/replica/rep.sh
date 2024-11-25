#!/bin/bash
set -e

pg_ctl -D "$PGDATA" -o "-p $REPLICA_PORT" -m fast -w stop

rm -r "$PGDATA"/*

pg_basebackup -h $MASTER_HOST -p $MASTER_PORT -U $REPLICATION_USER -D $PGDATA -Fp -Xs -P -R

echo "Replica config successful"