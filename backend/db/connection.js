const { Pool, types } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `${__dirname}/../.env.${ENV}` });

// Overriding parsing of dates
types.setTypeParser(1082, (val) => val);

const connectionString =
  process.env.PGDATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.PGDATABASE;

if (!connectionString) {
  throw new Error('No database connection string found.');
}

console.log(`✅ Connecting to database: ${connectionString}`);

const config = {
  connectionString,
  max: 2,
  ssl:
    ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
};

const db = new Pool(config);

module.exports = db;
