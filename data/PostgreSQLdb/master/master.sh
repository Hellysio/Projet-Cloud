#!/bin/bash

# Initialize the database directory if it doesn't already exist
if [ ! -d "$PGDATA" ]; then
    initdb -D "$PGDATA"
fi

# Ensure the WAL archive directory exists (optional, based on config)
mkdir -p /var/lib/postgresql/data/archive

# Configure access control in `pg_hba.conf`
if ! grep -q "host replication all 0.0.0.0/0 md5" "$PGDATA/pg_hba.conf"; then
    echo "host replication all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
fi

# Start PostgreSQL temporarily to set up the replication user
pg_ctl -D "$PGDATA" -o "-c listen_addresses='*' -c port=5433" -w start

# Create the replication user if it doesn't exist
psql -U "$POSTGRES_USER" -c "DO \$\$ 
BEGIN 
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'repuser') THEN
      CREATE ROLE repuser WITH REPLICATION LOGIN PASSWORD 'rep_pass';
   END IF;
END
\$\$;"

# Stop the PostgreSQL server
pg_ctl -D "$PGDATA" -m fast stop
