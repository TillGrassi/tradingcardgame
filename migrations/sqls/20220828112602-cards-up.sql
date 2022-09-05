CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    image VARCHAR(100),
    description VARCHAR(500),
    effect VARCHAR(250),
    rarity VARCHAR(10)
)