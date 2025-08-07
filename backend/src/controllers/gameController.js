require('dotenv').config();
const express = require('express');
const { db } = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Récupérer les statistiques d'un utilisateur
router.get('/user/:userId', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.userId);

  // Vérifier que l'utilisateur accède à ses propres stats
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false,
      message: 'Accès non autorisé' 
    });
  }

  db.get(
    `SELECT us.*, u.username, u.email 
     FROM user_stats us 
     JOIN users u ON us.user_id = u.id 
     WHERE us.user_id = ?`,
    [userId],
    (err, row) => {
      if (err) {
        console.error('Erreur lors de la récupération des stats:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Erreur serveur' 
        });
      }

      if (!row) {
        // Créer les stats si elles n'existent pas
        db.run('INSERT INTO user_stats (user_id) VALUES (?)', [userId], function(insertErr) {
          if (insertErr) {
            console.error('Erreur création stats:', insertErr);
            return res.status(500).json({ 
              success: false,
              message: 'Erreur serveur' 
            });
          }
          
          // Retourner les stats par défaut
          return res.json({
            success: true,
            username: req.user.username,
            stats: {
              pokemonCaught: 0,
              badgesEarned: 0,
              battlesWon: 0,
              hoursPlayed: 0
            }
          });
        });
      } else {
        res.json({
          success: true,
          username: row.username,
          stats: {
            pokemonCaught: row.pokemon_caught,
            badgesEarned: row.badges_earned,
            battlesWon: row.battles_won,
            hoursPlayed: row.hours_played
          }
        });
      }
    }
  );
});

// Mettre à jour les statistiques
router.put('/user/:userId', authenticateToken, (req, res) => {
  const userId = parseInt(req.params.userId);
  const { pokemonCaught, badgesEarned, battlesWon, hoursPlayed } = req.body;

  // Vérifier que l'utilisateur modifie ses propres stats
  if (req.user.id !== userId) {
    return res.status(403).json({ 
      success: false,
      message: 'Accès non autorisé' 
    });
  }

  db.run(
    `UPDATE user_stats 
     SET pokemon_caught = ?, badges_earned = ?, battles_won = ?, hours_played = ?
     WHERE user_id = ?`,
    [pokemonCaught || 0, badgesEarned || 0, battlesWon || 0, hoursPlayed || 0, userId],
    function(err) {
      if (err) {
        console.error('Erreur lors de la mise à jour:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Erreur serveur' 
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
        message: 'Statistiques mises à jour avec succès' 
      });
    }
  );
});

// Ajouter un Pokémon capturé
router.post('/catch-pokemon', authenticateToken, (req, res) => {
  const { pokemonId, pokemonName, level, nickname } = req.body;
  const userId = req.user.id;

  if (!pokemonId || !pokemonName) {
    return res.status(400).json({ 
      success: false,
      message: 'pokemonId et pokemonName requis' 
    });
  }

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO caught_pokemon 
    (user_id, pokemon_id, pokemon_name, level, nickname) 
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(userId, pokemonId, pokemonName, level || 1, nickname || null, function(err) {
    if (err) {
      console.error('Erreur catch pokemon:', err);
      return res.status(500).json({ 
        success: false,
        message: 'Erreur serveur' 
      });
    }

    // Mettre à jour les stats
    db.run(
      'UPDATE user_stats SET pokemon_caught = pokemon_caught + 1 WHERE user_id = ?',
      [userId],
      (statsErr) => {
        if (statsErr) {
          console.error('Erreur mise à jour stats:', statsErr);
        }
      }
    );

    res.status(201).json({ 
      success: true,
      message: `${pokemonName} capturé avec succès !` 
    });
  });

  stmt.finalize();
});

// Obtenir les Pokémon capturés
router.get('/caught-pokemon', authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.all(
    'SELECT * FROM caught_pokemon WHERE user_id = ? ORDER BY caught_at DESC',
    [userId],
    (err, rows) => {
      if (err) {
        console.error('Erreur récupération Pokémon:', err);
        return res.status(500).json({ 
          success: false,
          message: 'Erreur serveur' 
        });
      }

      res.json({
        success: true,
        pokemon: rows
      });
    }
  );
});

// Récupérer le guide en cours d'un utilisateur
router.get('/user/:userId/current-guide', (req, res) => {
  const userId = req.params.userId;
  db.get('SELECT guide_name FROM user_guides WHERE user_id = ? ORDER BY started_at DESC LIMIT 1', [userId], (err, guide) => {
    if (err) {
      console.error('Erreur DB get guide:', err);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
    if (!guide) {
      return res.json({ success: true, guide: null });
    }
    res.json({ success: true, guide: guide.guide_name });
  });
});

module.exports = router;
