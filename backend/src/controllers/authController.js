require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../db/database');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

// Configuration depuis .env
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

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
    
    // Insertion en base
    const stmt = db.prepare('INSERT INTO users (email, username, password) VALUES (?, ?, ?)');
    stmt.run(email, username, hashedPassword, function(err) {
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
      
      const userId = this.lastID;
      
      // Créer les statistiques initiales pour l'utilisateur
      const statsStmt = db.prepare('INSERT INTO user_stats (user_id) VALUES (?)');
      statsStmt.run(userId, function(statsErr) {
        if (statsErr) {
          console.error('Erreur création stats:', statsErr);
        }
        statsStmt.finalize();
      });
      
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

module.exports = router;
