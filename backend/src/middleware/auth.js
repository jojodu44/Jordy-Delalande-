const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") return res.status(401).json({ message: "Token expiré" });
    return res.status(401).json({ message: "Token invalide" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Non authentifié" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Accès refusé" });
    next();
  };
}

module.exports = { verifyToken, requireRole };