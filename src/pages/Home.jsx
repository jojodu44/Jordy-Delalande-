// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur Mon Santé Animal</h1>
      <p className="mb-4">Connectez-vous ou inscrivez-vous pour continuer.</p>
      <div className="flex justify-center gap-4">
        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Se connecter
        </Link>
        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          S'inscrire
        </Link>
      </div>
    </div>
  );
}