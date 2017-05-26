const pg = require('pg');

module.exports = function() {
  const connectionString = process.env.DB_URL || 'postgres://localhost:5432/financeapptestdb';

  client = new pg.Client({
    user: 'postgres',
    password: 'password',
    database: 'financeapptestdb',
    host: 'localhost',
    port: 5432
  });
  client.connect();

  const query = client.query(
    'TRUNCATE TABLE transactions CASCADE; TRUNCATE TABLE accounts CASCADE'
  );

  query.on('end', function() {
    console.log("DB cleared successfully");
  });
}
