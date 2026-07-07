/**
 * Middleware global de gestion des erreurs.
 */
function errorHandler(err, req, res, next) {
  console.error('Erreur serveur :', err);
  res.status(500).json({
    message: "Une erreur interne est survenue sur le serveur",
    detail: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
}

/**
 * Middleware pour les routes non trouvées (404).
 */
function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route ${req.originalUrl} introuvable` });
}

module.exports = { errorHandler, notFoundHandler };
