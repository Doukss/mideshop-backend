require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/db');

/**
 * Exécute le fichier schema.sql contre la base de données configurée.
 * Utilisation : npm run db:migrate
 */
async function migrate() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf-8');

  console.log('Connexion à la base de données...');
  const client = await pool.connect();

  try {
    console.log('Exécution du schéma (db/schema.sql)...');
    await client.query(sql);
    console.log('✅ Migration terminée avec succès. La table "todos" est prête.');
  } catch (err) {
    console.error('❌ Échec de la migration :', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
