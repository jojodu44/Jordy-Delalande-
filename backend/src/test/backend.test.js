import request from "supertest";
import fs from "fs";
import path from "path";
import app from "../index.js";

let userToken = "";
let adminToken = "";

const testUser = { email: "alice@example.com", password: "password123" };
const testAdmin = { email: "jordy@example.com", password: "admin123" };

describe("🔹 Backend API Tests", () => {
  beforeAll(async () => {
    const resUser = await request(app).post("/auth/login").send(testUser);
    userToken = resUser.body.token;

    const resAdmin = await request(app).post("/auth/login").send(testAdmin);
    adminToken = resAdmin.body.token;
  });

  test("POST /auth/login - utilisateur valide", async () => {
    const res = await request(app).post("/auth/login").send(testUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /auth/login - mot de passe incorrect", async () => {
    const res = await request(app).post("/auth/login").send({ ...testUser, password: "wrong" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  test("GET /users/me - profil utilisateur", async () => {
    const res = await request(app).get("/users/me").set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(testUser.email);
    expect(res.body).not.toHaveProperty("password_hash");
  });

  test("GET /users - admin uniquement", async () => {
    const res = await request(app).get("/users").set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /users - utilisateur non admin bloque", async () => {
    const res = await request(app).get("/users").set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message");
  });

  // Tests supplémentaires pour demarches, documents, notifications
});