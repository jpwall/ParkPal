# ParkPal Backend
## DB Setup

For this project, we are using PostgreSQL. The instructions are as follows.

First, download PostgreSQL server:
`sudo apt install postgresql`
`sudo dnf install postgresql`
`sudo yum install postgresql`

(Or download the official server software in Windows)

Next, start the PostgreSQL server:
`sudo pg_ctlcluster 12 main start`

(Or equivalent command in Windows)

[NEW] Run the SQL init script:
```
psql -h 127.0.0.1 -f scripts/init.sql
```

OR, Configure the server in a local shell:
```
psql
=# CREATE USER parkpal WITH PASSWORD 'pass';
=# CREATE DATABASE parkpal WITH OWNER = parkpal;
=# \q
```
Edit the `pg_hba.conf` to use `md5` authentication instead of `peer` for `parkpal`
```
psql parkpal parkpal
=> CREATE TABLE "user"(id SERIAL PRIMARY KEY, username VARCHAR (255) UNIQUE NOT NULL, password VARCHAR (64) NOT NULL);
=> CREATE TABLE "feature"(fid INTEGER UNIQUE NOT NULL, name VARCHAR (35) UNIQUE NOT NULL, image VARCHAR);
=> CREATE TABLE "park"(pid INTEGER NOT NULL, name VARCHAR, fid INTEGER NOT NULL, lat FLOAT, lon FLOAT, hours VARCHAR (60), youth_only BOOLEAN, lighting BOOLEAN);
=> \d
```
We should now see that there is a `user`, `feature`, and `park` table!

## Python Setup

Install all the packages
```
pip install flask flask_cors psycopg2 config
```

## Data Integration

`python scripts/consolidate.py data/Seattle_Parks.json`

## Run the Backend

`python app.py`