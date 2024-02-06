DROP DATABASE IF EXISTS league_db;

CREATE DATABASE league_db;

\c league_db;

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    team_name TEXT NOT NULL,
    state TEXT,
    city TEXT
);

CREATE TABLE players(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    team_name_id INTEGER REFERENCES teams
);

CREATE TABLE matches(
    id SERIAL PRIMARY KEY,
    winner_id INTEGER REFERENCES teams,
    loser_id INTEGER REFERENCES teams
);

CREATE TABLE goals(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players,
    goals_scored INTEGER,
    match_id INTEGER REFERENCES matches
);

CREATE TABLE referees(
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    match_id INTEGER REFERENCES matches NOT NULL
);

CREATE TABLE start_end_dates(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_date DATE
); 