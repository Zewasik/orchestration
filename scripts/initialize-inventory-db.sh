#!/bin/bash

sudo apt-get update

sudo apt-get install -y postgresql postgresql-contrib

sudo service postgresql start

sudo -u postgres psql -c "CREATE USER inventory WITH PASSWORD 'inventory';"
sudo -u postgres psql -c "CREATE DATABASE movie;"
sudo -u postgres psql -c "ALTER USER inventory WITH SUPERUSER;"

psql -h localhost -U inventory -d movie -c "CREATE TABLE movie (id SERIAL PRIMARY KEY, title VARCHAR(100), description VARCHAR(1000));"

echo "PostgreSQL installation and initialization completed."
