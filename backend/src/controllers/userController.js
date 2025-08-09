const express = require('express');
const bcrypt = require('bcrypt');
const { db } = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserInfo'
 *                 total:
 *                   type: integer
 *                   description: Nombre total d'utilisateurs
 *       500:
 *         description: Erreur serveur
 */
router.get('/', (req, res) => {
  db.all(
    'SELECT id, email, username, created_at, updated_at FROM users ORDER BY created_at DESC', 
    [], 
    (err, users) => {
      if (err) {
        console.error('Erreur DB get all users:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erreur serveur' 
        });
      }
      
      res.json({ 
        success: true, 
        users: users || [],
        total: users ? users.length : 0
      });
    }
  );
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserInfo:
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
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupérer les informations d'un utilisateur par ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de l'utilisateur
 *     responses:
 *       200:
 *         description: Informations utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/UserInfo'
 *       404:
 *         description: Utilisateur non trouvé
 *       403:
 *         description: Accès non autorisé
 */
router.get('/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  
  // Vérifier que l'utilisateur connecté peut accéder à ces infos
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Accès non autorisé' 
    });
  }

  db.get(
    'SELECT id, email, username, created_at, updated_at FROM users WHERE id = ?', 
    [userId], 
    (err, user) => {
      if (err) {
        console.error('Erreur DB get user:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erreur serveur' 
        });
      }
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Utilisateur non trouvé' 
        });
      }
      
      res.json({ 
        success: true, 
        user 
      });
    }
  );
});

/**
 * @swagger
 * /api/users/by-username/{username}:
 *   get:
 *     summary: Récupérer un utilisateur par nom d'utilisateur
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom d'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/UserInfo'
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/by-username/:username', (req, res) => {
  const username = req.params.username;
  
  db.get(
    'SELECT id, email, username, created_at FROM users WHERE username = ?', 
    [username], 
    (err, user) => {
      if (err) {
        console.error('Erreur DB get user by username:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erreur serveur' 
        });
      }
      
      if (!user) {
        return res.status(404).json({ 
          success: false, 
          message: 'Utilisateur non trouvé' 
        });
      }
      
      res.json({ 
        success: true, 
        user 
      });
    }
  );
});

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Mettre à jour les informations d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Informations mises à jour avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  const { email, username, password } = req.body;
  
  // Vérifier que l'utilisateur connecté peut modifier ces infos
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Accès non autorisé' 
    });
  }

  if (!email && !username && !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Aucune donnée à mettre à jour' 
    });
  }

  let fields = [];
  let values = [];

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: 'Format d\'email invalide' 
      });
    }
    fields.push('email = ?');
    values.push(email);
  }

  if (username) {
    fields.push('username = ?');
    values.push(username);
  }

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }
    const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    fields.push('password = ?');
    values.push(hashedPassword);
  }

  values.push(userId);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  db.run(sql, values, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ 
          success: false,
          message: 'Email ou username déjà utilisé' 
        });
      }
      console.error('Erreur DB update user:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Erreur lors de la mise à jour' 
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Informations mises à jour' 
    });
  });
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       403:
 *         description: Accès non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const userId = req.params.id;
  
  // Vérifier que l'utilisateur connecté peut supprimer ce compte
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false, 
      message: 'Accès non autorisé' 
    });
  }

  if (!userId) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID utilisateur requis' 
    });
  }

  try {
    db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
      if (err) {
        console.error('Erreur suppression utilisateur:', err);
        return res.status(500).json({ 
          success: false, 
          message: 'Erreur serveur lors de la suppression' 
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Utilisateur non trouvé' 
        });
      }

      res.json({ 
        success: true, 
        message: 'Utilisateur supprimé avec succès' 
      });
    });
  } catch (error) {
    console.error('Erreur suppression:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

module.exports = router;
