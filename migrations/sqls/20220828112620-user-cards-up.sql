CREATE TABLE user_cards (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) REFERENCES users (username),
    card integer REFERENCES cards (id)
)