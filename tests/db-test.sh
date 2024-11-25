#!/bin/bash

MASTER_DB="master_db"
REPLICA_DB="replica_db"
USER="admin"
DATABASE="DescriptionDB"

TEST_FILENAME="replication_test.jpg"
TEST_FILE_SIZE=12345
TEST_DESCRIPTION="This is a replication test row"
TEST_DATE=$(date +'%Y-%m-%d %H:%M:%S')

MASTER_PORT=5433
REPLICA_PORT=5434

echo "Inserting test row into master"
docker exec $MASTER_DB psql -p $MASTER_PORT -U $USER -d $DATABASE -c "INSERT INTO descriptiontb (filename, file_size, description, date_of_upload) VALUES ('$TEST_FILENAME', $TEST_FILE_SIZE, '$TEST_DESCRIPTION', '$TEST_DATE');"

echo "Checking in replica"
REPLICA_CHECK=$(docker exec $REPLICA_DB psql -p $REPLICA_PORT -U $USER -d $DATABASE -c "SELECT COUNT(*) FROM descriptiontb WHERE filename='$TEST_FILENAME' AND file_size=$TEST_FILE_SIZE AND description='$TEST_DESCRIPTION';" | grep -o '[0-9]\+')

REPLICA_CHECK=$(echo "$REPLICA_CHECK" | tr -d '[:space:]')

echo "Replica check result: '$REPLICA_CHECK'"


if [ "$REPLICA_CHECK" -gt 1 ]; then
  echo "Replication is working correctly."
else
  echo "Replication failed!"
fi
