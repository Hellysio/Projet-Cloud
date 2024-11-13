#!/bin/bash
echo "host replication all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
echo "wal_level = replica" >> "$PGDATA/postgresql.conf"
echo "max_wal_senders = 3" >> "$PGDATA/postgresql.conf"
echo "wal_keep_size = 64" >> "$PGDATA/postgresql.conf"
echo "archive_mode = on" >> "$PGDATA/postgresql.conf"
echo "archive_command = 'cp %p /var/lib/postgresql/data/archive/%f'" >> "$PGDATA/postgresql.conf"

psql -U "$POSTGRES_USER" -c "CREATE USER replica REPLICATION LOGIN CONNECTION LIMIT 3 ENCRYPTED PASSWORD 'replica_pass';"
