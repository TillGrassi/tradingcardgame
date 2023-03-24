CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(200),
    boosterpacks integer,
    coins integer,
    last_login TIMESTAMP DEFAULT NOW()
)