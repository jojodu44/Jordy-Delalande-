import React, { useState } from "react";
import { createDemarche } from "../api";

export default function Guide({ onComplete }) {
  const token = localStorage.getItem("token");
  const steps = ["Étape 1", "Étape 2", "Étape 3"];
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else {
      createDemarche(token, { title: "Nouvelle démarche", status: "en_cours" })
        .then(() => onComplete())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="card max-w-lg mx-auto">
      <h2 className="font-bold text-lg mb-4">{steps[current]}</h2>
      <button
        className="px-4 py-2 rounded-md bg-gradient-to-r from-gradient-start to-gradient-end text-white"
        onClick={handleNext}
      >
        {current === steps.length - 1 ? "Terminer" : "Suivant"}
      </button>
    </div>
  );
}