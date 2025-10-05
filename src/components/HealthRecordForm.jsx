import React, { useState } from "react";

export default function HealthRecordForm({ petId, onAdd }) {
  const [type, setType] = useState("");
  const [vet, setVet] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) return alert("Le type est requis");

    onAdd(petId, { type, vet, notes });
    setType("");
    setVet("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Type (vaccination, traitement, consultation)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Vétérinaire"
        value={vet}
        onChange={(e) => setVet(e.target.value)}
        className="p-2 border rounded"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Ajouter la fiche
      </button>
    </form>
  );
}
