require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', process.env.DB_NAME || 'professor_oak_challenge.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la connexion à SQLite:', err.message);
  } else {
    console.log('✅ Connexion à SQLite réussie:', dbPath);
  }
});

// Fonction d'initialisation des tables
const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Table des utilisateurs
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, (err) => {
        if (err) console.error('Erreur table users:', err);
        else console.log('✅ Table users créée/vérifiée');
      });

      // Table des Pokémon capturés
      db.run(`CREATE TABLE IF NOT EXISTS caught_pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        pokemon_id INTEGER NOT NULL,
        pokemon_name TEXT NOT NULL,
        level INTEGER DEFAULT 1,
        nickname TEXT,
        caught_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        UNIQUE(user_id, pokemon_id)
      )`, (err) => {
        if (err) console.error('Erreur table caught_pokemon:', err);
        else console.log('✅ Table caught_pokemon créée/vérifiée');
      });

      // Table des badges
      db.run(`CREATE TABLE IF NOT EXISTS gym_badges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        badge_name TEXT NOT NULL,
        gym_leader TEXT NOT NULL,
        earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`, (err) => {
        if (err) console.error('Erreur table gym_badges:', err);
        else console.log('✅ Table gym_badges créée/vérifiée');
      });

      // Table des statistiques
      db.run(`CREATE TABLE IF NOT EXISTS user_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        pokemon_caught INTEGER DEFAULT 0,
        badges_earned INTEGER DEFAULT 0,
        battles_won INTEGER DEFAULT 0,
        hours_played INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`, (err) => {
        if (err) {
          console.error('Erreur table user_stats:', err);
          reject(err);
        } else {
          console.log('✅ Table user_stats créée/vérifiée');
          console.log('🗄️  Base de données initialisée avec succès');
          resolve();
        }
      });
    });
  });
};

module.exports = { db, initDatabase };
