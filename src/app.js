const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const todoRoutes = require('./routes/todoRoutes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());

// Route de vérification de santé de l'API
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenue sur l'API Todo List de MediShop",
    documentation: '/api-docs',
  });
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes de l'API
app.use('/api/todos', todoRoutes);

// Gestion des routes non trouvées et des erreurs
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
