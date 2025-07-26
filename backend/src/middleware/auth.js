require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ JWT_SECRET non défini dans les variables d\'environnement');
  process.exit(1);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token d\'accès requis' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erreur JWT:', err.message);
      return res.status(403).json({ 
        success: false, 
        message: 'Token invalide ou expiré' 
      });
    }
    req.user = user;
    next();
  });
};

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: process.env.TOKEN_EXPIRY || '24h' 
  });
};

module.exports = { 
  authenticateToken, 
  generateToken,
  JWT_SECRET 
};
