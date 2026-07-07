const { Pool } = require('pg');

/**
 * Configuration de la connexion PostgreSQL.
 * Priorité à DATABASE_URL si elle est définie, sinon variables individuelles.
 */
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
    })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'medishop_db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'passer0412',
      ssl:
        process.env.DB_SSL === 'true'
          ? { rejectUnauthorized: false }
          : false,
    });

pool.on('error', (err) => {
  console.error('Erreur inattendue sur le pool PostgreSQL :', err);
});

module.exports = { pool };
