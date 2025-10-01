import React from "react";

export default function Home({ onStart }) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-2xl font-bold">Bienvenue sur HandiCap</h1>
      <p>Commencez votre première démarche en cliquant ci-dessous :</p>
      <button
        onClick={onStart}
        className="px-6 py-3 rounded-md bg-gradient-to-r from-gradient-start to-gradient-end text-white font-semibold"
      >
        Commencer
      </button>
    </div>
  );
}