const { Pool, Client } = require('pg');
require('dotenv').config();

const dbConfig = {
  user: process.env.PGUSER,
  host: process.env.PBHOST,
  database: process.env.PGDATABASE,
  password: process.env.PBPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(dbConfig);
const client = new Client(dbConfig);

module.exports = { client, pool };
