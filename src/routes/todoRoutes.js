const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - titre
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique généré automatiquement
 *           example: 3fa85f64-5717-4562-b3fc-2c963f66afa6
 *         titre:
 *           type: string
 *           description: Titre de la tâche
 *           example: Préparer la réunion d'équipe
 *         description:
 *           type: string
 *           description: Description détaillée de la tâche
 *           example: Préparer les slides et l'ordre du jour
 *         statut:
 *           type: string
 *           enum: [a_faire, en_cours, terminee]
 *           description: Statut actuel de la tâche
 *           example: a_faire
 *         dateCreation:
 *           type: string
 *           format: date-time
 *           description: Date de création de la tâche
 *         dateMiseAJour:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *     TodoInput:
 *       type: object
 *       required:
 *         - titre
 *       properties:
 *         titre:
 *           type: string
 *           example: Préparer la réunion d'équipe
 *         description:
 *           type: string
 *           example: Préparer les slides et l'ordre du jour
 *         statut:
 *           type: string
 *           enum: [a_faire, en_cours, terminee]
 *           example: a_faire
 *     Erreur:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Tâche introuvable
 */

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Gestion des tâches (Todo List) de MediShop
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Récupère la liste de toutes les tâches
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [a_faire, en_cours, terminee]
 *         description: Filtrer les tâches par statut
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Statut de filtre invalide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get('/', todoController.getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Récupère une tâche par son identifiant
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la tâche
 *     responses:
 *       200:
 *         description: Tâche trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Tâche introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.get('/:id', todoController.getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Crée une nouvelle tâche
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.post('/', todoController.createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Met à jour une tâche existante
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 *       404:
 *         description: Tâche introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.put('/:id', todoController.updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Supprime une tâche
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Identifiant de la tâche
 *     responses:
 *       204:
 *         description: Tâche supprimée avec succès (pas de contenu retourné)
 *       404:
 *         description: Tâche introuvable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erreur'
 */
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
