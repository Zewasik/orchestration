#!/bin/bash

export PGPASSWORD=inventory

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib

sudo service postgresql start

sudo -u postgres psql -c "CREATE USER inventory WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE movies;"
sudo -u postgres psql -c "ALTER USER inventory WITH SUPERUSER;"

psql -h localhost -U inventory -d movies -c "CREATE TABLE movies (id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(1000));"

PGPASSWORD=billing

sudo -u postgres psql -c "CREATE USER billing WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE orders;"
sudo -u postgres psql -c "ALTER USER billing WITH SUPERUSER;"

psql -h localhost -U billing  -d orders -c "CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id int, number_of_items int, total_amount int);"

unset PGPASSWORD

echo "PostgreSQL installation and initialization completed."