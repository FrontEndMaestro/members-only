const { pool } = require("./dbConnection");

const createTables = `
CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    password VARCHAR(255),
    membership_status BOOL DEFAULT FALSE
    isAdmin BOOL DEFAULT FALSE
);

CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT,
    time TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);
`;

async function main() {
  try {
    await pool.query(createTables);
    await pool.end();
  } catch (error) {
    console.warn(error);
  }
  console.log("done");
}

main();
