DROP DATABASE craigslist_db;

CREATE DATABASE craigslist_db;

\c craigslist_db;

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    state TEXT NOT NULL,
    city TEXT,
    zip_code INTEGER
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    location_id INTEGER REFERENCES regions ON DELETE SET NULL
);

CREATE TABLE users_regions (
    id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    pref_region INTEGER REFERENCES regions ON DELETE SET NULL PRIMARY KEY
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    title TEXT NOT NULL,
    info TEXT,
    region_id INTEGER REFERENCES regions ON DELETE CASCADE,
    category TEXT
);
