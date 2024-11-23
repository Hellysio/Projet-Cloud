#!/bin/bash
set -e

echo "max_connections = 5" >> "$PGDATA/postgresql.conf"
echo "wal_level = hot_standby" >> "$PGDATA/postgresql.conf"
echo "max_wal_senders = 5" >> "$PGDATA/postgresql.conf"
echo "hot_standby = on" >> "$PGDATA/postgresql.conf"

echo "host replication $REPLICATION_USER 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"

pg_ctl -D "$PGDATA" -m fast -w restart

# # Wait for PostgreSQL to start up
# echo "Waiting for PostgreSQL to start..."
# until pg_isready -h $POSTGRES_HOST -U $POSTGRES_USER -p $POSTGRES_PORT; do
#   sleep 3
# done

# # Create the replication user
# echo "Creating replication user..."
# psql -U $POSTGRES_USER -d $POSTGRES_DB -p $POSTGRES_PORT -c "CREATE USER replicationUser WITH REPLICATION PASSWORD '$POSTGRES_PASSWORD';"

# # Confirm user creation
# psql -U $POSTGRES_USER -d $POSTGRES_DB -p $POSTGRES_PORT -c "\du"

# # Exit the script
# echo "Replication user created successfully."
# pg_ctl -D "$PGDATA" -m fast -w reload


