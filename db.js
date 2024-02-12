const { Pool } = require('pg');

// PostgreSQL Connection Configuration
const pool = new Pool({
  user: 'pikai123',
  password: 'pass123',
  host: 'db',
  port: 5432, // PostgreSQL default port
  database: 'dbms',
});

module.exports = pool;
