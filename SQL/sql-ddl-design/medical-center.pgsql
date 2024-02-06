DROP DATABASE med_center_db;

CREATE DATABASE med_center_db;

\c med_center_db;

CREATE TABLE doctors(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE patients(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE diseases(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE doctors_patients(
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors ON DELETE SET NULL,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE
);

CREATE TABLE patients_diseases(
    id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients ON DELETE CASCADE,
    diseases_id INTEGER REFERENCES diseases ON DELETE CASCADE
);