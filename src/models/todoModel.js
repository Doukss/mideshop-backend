const { pool } = require('../config/db');

/**
 * Convertit une ligne PostgreSQL (snake_case) vers le format API (camelCase).
 */
function versApi(row) {
  return {
    id: row.id,
    titre: row.titre,
    description: row.description,
    statut: row.statut,
    dateCreation: row.date_creation,
    dateMiseAJour: row.date_mise_a_jour,
  };
}

/**
 * Récupère toutes les tâches, avec filtre optionnel par statut.
 */
async function findAll(statut) {
  const params = [];
  let sql = 'SELECT * FROM todos';

  if (statut) {
    params.push(statut);
    sql += ' WHERE statut = $1';
  }

  sql += ' ORDER BY date_creation DESC';

  const { rows } = await pool.query(sql, params);
  return rows.map(versApi);
}

/**
 * Récupère une tâche par son id.
 */
async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return rows[0] ? versApi(rows[0]) : null;
}

/**
 * Crée une nouvelle tâche.
 */
async function create({ id, titre, description, statut }) {
  const { rows } = await pool.query(
    `INSERT INTO todos (id, titre, description, statut)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [id, titre, description || '', statut || 'a_faire']
  );
  return versApi(rows[0]);
}

/**
 * Met à jour une tâche existante. Retourne null si l'id n'existe pas.
 */
async function update(id, { titre, description, statut }) {
  const { rows } = await pool.query(
    `UPDATE todos
     SET titre = COALESCE($2, titre),
         description = COALESCE($3, description),
         statut = COALESCE($4, statut),
         date_mise_a_jour = now()
     WHERE id = $1
     RETURNING *`,
    [id, titre, description, statut]
  );
  return rows[0] ? versApi(rows[0]) : null;
}

/**
 * Supprime une tâche. Retourne true si une ligne a été supprimée.
 */
async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM todos WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, remove };
