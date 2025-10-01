import dotenv from "dotenv";
dotenv.config();

const requiredVars = ["DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT", "DB_NAME", "JWT_SECRET"];
requiredVars.forEach((v) => {
  if (!process.env[v]) console.warn(`⚠️ Warning: ${v} is not defined in .env`);
});

export default {
  port: process.env.PORT || 4000,
  dbUrl: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`,
  jwtSecret: process.env.JWT_SECRET || "defaultsecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  uploadDir: "uploads"
};