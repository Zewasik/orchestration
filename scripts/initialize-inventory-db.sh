#!/bin/bash

export PGPASSWORD=inventory

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib

sudo service postgresql start

sudo -u postgres psql -c "CREATE USER inventory WITH PASSWORD '$PGPASSWORD';"
sudo -u postgres psql -c "CREATE DATABASE movies;"
sudo -u postgres psql -c "ALTER USER inventory WITH SUPERUSER;"

psql -h localhost -U inventory -d movies -c "CREATE TABLE movies (id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(1000));"

unset PGPASSWORD

echo "PostgreSQL installation and initialization completed."