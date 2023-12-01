#!/bin/bash
source ../.env

export PGPASSWORD=$BILLING_DB_PASSWORD

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib

sudo service postgresql start

sudo -u postgres psql -c "CREATE USER $BILLING_PG_USER WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE $BILLING_DB_NAME;"
sudo -u postgres psql -c "ALTER USER $BILLING_PG_USER WITH SUPERUSER;"

psql -h localhost -U $BILLING_PG_USER -d $BILLING_DB_NAME -c "CREATE TABLE IF NOT EXISTS orders (id SERIAL PRIMARY KEY, user_id int, number_of_items int, total_amount int);"

unset PGPASSWORD

echo "PostgreSQL installation and initialization completed."
