require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { randomUUID } = require('crypto');

const dbPath = path.join(__dirname, '..', process.env.DB_NAME || 'professor_oak_challenge.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la connexion à SQLite:', err.message);
  } else {
    console.log('✅ Connexion à SQLite réussie:', dbPath);
    db.run('PRAGMA foreign_keys = ON');
  }
});

function runAsync(sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

const initDatabase = async () => {
  try {
    // Table users
    await runAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Table users créée/vérifiée');

    // Trigger pour mise à jour automatique de updated_at
    await runAsync(`
      CREATE TRIGGER IF NOT EXISTS update_users_updated_at
      AFTER UPDATE ON users
      FOR EACH ROW
      BEGIN
        UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
      END;
    `);
    console.log('✅ Trigger update_users_updated_at créé/vérifié');

    // Table guides_list
    await runAsync(`
      CREATE TABLE IF NOT EXISTS guides_list (
        id TEXT PRIMARY KEY,
        guide_name_fr TEXT NOT NULL,
        guide_name_en TEXT NOT NULL
      )
    `);
    console.log('✅ Table guides_list créée/vérifiée');

    // Ajout des guides si la table est vide
    db.get('SELECT COUNT(*) as count FROM guides_list', (err, row) => {
      if (!err && row.count === 0) {
        db.run(
          `INSERT INTO guides_list (id, guide_name_fr, guide_name_en) VALUES (?, ?, ?)`,
          [randomUUID(), 'Pokémon Jaune', 'Pokemon Yellow']
        );
        db.run(
          `INSERT INTO guides_list (id, guide_name_fr, guide_name_en) VALUES (?, ?, ?)`,
          [randomUUID(), 'Pokémon Rouge et Bleu', 'Pokemon Red and Blue']
        );
      }
    });

    // Table user_guides
    await runAsync(`
      CREATE TABLE IF NOT EXISTS user_guides (
        id TEXT PRIMARY KEY,           -- UUID
        user_id INTEGER NOT NULL,
        guide_name TEXT NOT NULL,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Table user_guides créée/vérifiée');

    // Table captures
    await runAsync(`
      CREATE TABLE IF NOT EXISTS captures (
        id TEXT PRIMARY KEY,           -- UUID
        user_guide_id TEXT NOT NULL,
        pokemon_id TEXT NOT NULL,
        captured_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_guide_id) REFERENCES user_guides(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Table captures créée/vérifiée');

    console.log('🗄️  Base de données initialisée avec succès');
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation de la base:', err);
    throw err;
  }
};

module.exports = { db, initDatabase };
