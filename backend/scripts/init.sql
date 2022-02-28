CREATE USER parkpal WITH PASSWORD 'securepass';
CREATE DATABASE parkpal WITH OWNER = parkpal;
CREATE TABLE parkpal.user (
    id INTEGER PRIMARY KEY NOT NULL,
    username VARCHAR (255) UNIQUE NOT NULL,
    password CHAR (60) NOT NULL
);
CREATE TABLE parkpal.feature (
    fid INTEGER UNIQUE NOT NULL,
    name VARCHAR (35) UNIQUE NOT NULL,
    image VARCHAR
);
CREATE TABLE parkpal.park (
    pid INTEGER NOT NULL,
    name VARCHAR,
    fid INTEGER NOT NULL,
    lat FLOAT,
    lon FLOAT,
    hours VARCHAR (60),
    youth_only BOOLEAN,
    lighting BOOLEAN
);