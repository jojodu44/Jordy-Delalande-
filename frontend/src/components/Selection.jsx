import React from "react";

export default function Selection({ onStart }) {
  const demarches = [
    "CAF",
    "Impôts",
    "Permis de conduire",
    "Autres démarches"
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {demarches.map((d, idx) => (
        <div key={idx} className="card cursor-pointer hover:shadow-lg" onClick={onStart}>
          <h3 className="font-bold">{d}</h3>
        </div>
      ))}
    </div>
  );
}