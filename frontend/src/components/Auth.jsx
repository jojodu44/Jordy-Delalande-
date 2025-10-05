import React, { useState } from "react";
import { login, signup } from "../api";

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isSignup ? await signup(email, password) : await login(email, password);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Erreur réseau");
    }
  };

  return (
    <div className="card max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">{isSignup ? "Inscription" : "Connexion"}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-3 border rounded-md"
        />
        <button
          type="submit"
          className="w-full p-3 rounded-md bg-gradient-to-r from-gradient-start to-gradient-end text-white"
        >
          {isSignup ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
      <button
        className="mt-2 text-sm text-blue-500"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Déjà inscrit ? Connexion" : "Pas encore inscrit ? Créer un compte"}
      </button>
    </div>
  );
}
