require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { initDatabase } = require('./src/db/database');

// Import des contrôleurs
const authController = require('./src/controllers/authController');
const gameController = require('./src/controllers/gameController');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Professor Oak Challenge API',
      version: '1.0.0',
      description: 'API REST pour Professor Oak Challenge - Pokémon',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/controllers/*.js'], // Chemin vers les fichiers avec les annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware global
app.use(cors({
  origin: [
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000', // React dev server
    'http://127.0.0.1:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes principales
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: '🔴 Professor Oak Challenge API v1.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        verify: 'GET /api/auth/verify'
      }
    },
    environment: process.env.NODE_ENV || 'development'
  });
});

// Montage des routes
app.use('/api/auth', authController);
app.use('/api/game', gameController);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de gestion d'erreur globale
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false,
    message: `Route ${req.method} ${req.originalUrl} non trouvée`,
    availableRoutes: ['/api/auth', '/api/game']
  });
});

// Fonction de démarrage du serveur
async function startServer() {
  try {
    console.log('🚀 Démarrage du serveur Professor Oak Challenge...');
    console.log(`📊 Environnement: ${process.env.NODE_ENV || 'development'}`);
    
    // Initialiser la base de données
    await initDatabase();
    
    // Démarrer le serveur
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Serveur démarré avec succès`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🗄️  Base de données: ${process.env.DB_NAME}`);
      console.log(`🔑 JWT configuré: ${process.env.JWT_SECRET ? 'Oui' : 'Non'}`);
      console.log(`📡 API prête à recevoir des requêtes !`);
      console.log('');
      console.log('🎯 Endpoints disponibles:');
      console.log('   📝 POST /api/auth/register - Inscription');
      console.log('   🔐 POST /api/auth/login - Connexion');
      console.log('   ✅ GET  /api/auth/verify - Vérifier token');
      console.log('   📚 GET  /api-docs - Documentation Swagger');
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du serveur...');
  process.exit(0);
});

// Démarrer le serveur
startServer();
