require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../db/database');
const { generateToken } = require('../middleware/auth');
const { randomUUID } = require('crypto');

const router = express.Router();

// Mise à jour des infos utilisateur
router.patch('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;
  if (!email && !username && !password) {
    return res.status(400).json({ success: false, message: 'Aucune donnée à mettre à jour' });
  }
  let fields = [];
  let values = [];
  if (email) {
    fields.push('email = ?');
    values.push(email);
  }
  if (username) {
    fields.push('username = ?');
    values.push(username);
  }
  if (password) {
    const bcrypt = require('bcrypt');
    const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    fields.push('password = ?');
    values.push(hashedPassword);
  }
  values.push(userId);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.json({ success: true, message: 'Informations mises à jour' });
  });
});

// Configuration depuis .env
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: UUID de l'utilisateur
 *         email:
 *           type: string
 *           format: email
 *         username:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         token:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Inscription réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Données invalides
 *       409:
 *         description: Email ou nom d'utilisateur déjà utilisé
 */
// Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    
    // Validation des champs
    if (!email || !username || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email, username et mot de passe requis' 
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Format d\'email invalide' 
      });
    }

    // Validation mot de passe
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }
    
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Générer l'UUID pour l'utilisateur
    const userId = randomUUID();

    // Insertion en base
    const stmt = db.prepare('INSERT INTO users (id, email, username, password) VALUES (?, ?, ?, ?)');
    stmt.run(userId, email, username, hashedPassword, function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ 
            success: false,
            message: 'Email ou username déjà utilisé' 
          });
        }
        console.error('Erreur DB inscription:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Erreur serveur lors de l\'inscription' 
        });
      }

      // Générer le token
      const token = generateToken({
        id: userId,
        email,
        username
      });

      res.status(201).json({ 
        success: true,
        message: 'Utilisateur créé avec succès', 
        token,
        user: {
          id: userId,
          email,
          username
        }
      });
    });
    stmt.finalize();
    
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur' 
    });
  }
});

// Connexion
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Email ou nom d'utilisateur
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Identifiants incorrects
 *       400:
 *         description: Données manquantes
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email et mot de passe requis' 
      });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Erreur DB login:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Erreur serveur' 
        });
      }
      
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Email ou mot de passe incorrect' 
        });
      }

      try {
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
          return res.status(401).json({ 
            success: false,
            message: 'Email ou mot de passe incorrect' 
          });
        }

        const token = generateToken({
          id: user.id,
          email: user.email,
          username: user.username
        });
        
        res.json({ 
          success: true,
          message: 'Connexion réussie',
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username
          }
        });
        
      } catch (bcryptError) {
        console.error('Erreur bcrypt:', bcryptError);
        res.status(500).json({ 
          success: false,
          message: 'Erreur serveur' 
        });
      }
    });
    
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur' 
    });
  }
});

// Vérification du token
/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Vérifier la validité d'un token JWT
 *     tags: [Authentification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token manquant
 *       403:
 *         description: Token invalide ou expiré
 */
router.get('/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Token manquant' 
    });
  }

  try {
    const jwt = require('jsonwebtoken');
    const { JWT_SECRET } = require('../middleware/auth');
    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.json({ 
      success: true,
      message: 'Token valide',
      user: decoded 
    });
  } catch (error) {
    res.status(401).json({ 
      success: false,
      message: 'Token invalide' 
    });
  }
});

// Suppression d'un utilisateur via /api/user/delete/:id
router.delete('/user/delete/:id', async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'ID utilisateur requis' });
  }
  try {
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
      if (err) {
        console.error('Erreur suppression utilisateur:', err);
        return res.status(500).json({ success: false, message: 'Erreur serveur lors de la suppression' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
      }
      res.json({ success: true, message: 'Utilisateur supprimé avec succès' });
    });
  } catch (error) {
    console.error('Erreur suppression:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Récupérer les infos d'un utilisateur par son username
router.get('/user/by-username/:username', (req, res) => {
  const username = req.params.username;
  db.get('SELECT id, email, username FROM users WHERE username = ?', [username], (err, user) => {
    if (err) {
      console.error('Erreur DB get user:', err);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
    res.json({ success: true, user });
  });
});

module.exports = router;
