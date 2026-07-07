const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MediShop - API Gestion de Tâches (Todo List)',
      version: '1.0.0',
      description:
        "API CRUD permettant aux équipes internes de MediShop de créer, consulter, modifier et supprimer des tâches.",
      contact: {
        name: 'Équipe IT MediShop',
      },
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        description: 'Serveur local de développement',
        variables: {
          port: {
            default: '3000',
          },
        },
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
