#!/bin/bash
source .env

export PGPASSWORD=$INVENTORY_DB_PASSWORD

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib

sudo service postgresql start

sudo -u postgres psql -c "CREATE USER $INVENTORY_PG_USER WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE $INVENTORY_DB_NAME;"
sudo -u postgres psql -c "ALTER USER $INVENTORY_PG_USER WITH SUPERUSER;"

psql -h localhost -U $INVENTORY_PG_USER -d $INVENTORY_DB_NAME -c "CREATE TABLE IF NOT EXISTS movies (id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(1000));"

unset PGPASSWORD

echo "PostgreSQL installation and initialization completed."
