const { v4: uuidv4 } = require('uuid');
const todoModel = require('../models/todoModel');

const STATUTS_VALIDES = ['a_faire', 'en_cours', 'terminee'];

/**
 * GET /api/todos
 * Liste toutes les tâches, avec filtre optionnel par statut (?statut=)
 */
async function getAllTodos(req, res, next) {
  try {
    const { statut } = req.query;

    if (statut && !STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({
        message: `Statut invalide. Valeurs autorisées : ${STATUTS_VALIDES.join(', ')}`,
      });
    }

    const todos = await todoModel.findAll(statut);
    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
}

/**
 * GET /api/todos/:id
 * Récupère une tâche par son id
 */
async function getTodoById(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await todoModel.findById(id);

    if (!todo) {
      return res.status(404).json({ message: `Tâche avec l'id ${id} introuvable` });
    }

    return res.status(200).json(todo);
  } catch (err) {
    return next(err);
  }
}

/**
 * POST /api/todos
 * Crée une nouvelle tâche
 */
async function createTodo(req, res, next) {
  try {
    const { titre, description, statut } = req.body;

    if (!titre || typeof titre !== 'string' || titre.trim() === '') {
      return res.status(400).json({ message: 'Le champ "titre" est obligatoire' });
    }

    if (statut && !STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({
        message: `Statut invalide. Valeurs autorisées : ${STATUTS_VALIDES.join(', ')}`,
      });
    }

    const nouvelleTodo = await todoModel.create({
      id: uuidv4(),
      titre: titre.trim(),
      description: description ? String(description).trim() : '',
      statut: statut || 'a_faire',
    });

    return res.status(201).json(nouvelleTodo);
  } catch (err) {
    return next(err);
  }
}

/**
 * PUT /api/todos/:id
 * Met à jour une tâche existante
 */
async function updateTodo(req, res, next) {
  try {
    const { id } = req.params;
    const { titre, description, statut } = req.body;

    if (statut && !STATUTS_VALIDES.includes(statut)) {
      return res.status(400).json({
        message: `Statut invalide. Valeurs autorisées : ${STATUTS_VALIDES.join(', ')}`,
      });
    }

    const todoMiseAJour = await todoModel.update(id, {
      titre: titre !== undefined ? String(titre).trim() : undefined,
      description: description !== undefined ? String(description).trim() : undefined,
      statut,
    });

    if (!todoMiseAJour) {
      return res.status(404).json({ message: `Tâche avec l'id ${id} introuvable` });
    }

    return res.status(200).json(todoMiseAJour);
  } catch (err) {
    return next(err);
  }
}

/**
 * DELETE /api/todos/:id
 * Supprime une tâche
 */
async function deleteTodo(req, res, next) {
  try {
    const { id } = req.params;
    const supprime = await todoModel.remove(id);

    if (!supprime) {
      return res.status(404).json({ message: `Tâche avec l'id ${id} introuvable` });
    }

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
