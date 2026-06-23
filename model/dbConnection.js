const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASENAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = { pool };
