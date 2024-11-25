#!/bin/bash
set -e

until psql -U $POSTGRES_USER -d $POSTGRES_DB -p $MASTER_PORT -c "CREATE USER $REPLICATION_USER WITH REPLICATION PASSWORD '$POSTGRES_PASSWORD' LOGIN"; do
    sleep 3
done

echo "Master config successful"