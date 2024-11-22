from random import choice
from django.db.utils import OperationalError
from django.db import connections


class ReadWriteRouter:
    def db_for_read(self, model, **hints):
        db_list = ["replica_db", "default"]
        db_choice = choice(db_list)

        try:
            # Check if the chosen database is online
            db_conn = connections[db_choice]
            db_conn.cursor()            
        except OperationalError:
            #Retrieve the other database if the chosen database is down
            db_list.remove(db_choice)
            db_choice = db_list[0]
            print(f"Switching to {db_choice} for READ Query")
        print(f"performing READ query on {db_choice}")
        return db_choice

    def db_for_write(self, model, **hints):
        print(f"Using default database for WRITE query")
        return "default"