import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddPet({ onPetAdded }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/pets", { name, species, breed, dob });
      alert(`Animal créé : ${res.data.name}`);
      
      // ⚡ Met à jour la liste sans recharger
      if (onPetAdded) onPetAdded(res.data);

      // Réinitialiser le formulaire
      setName("");
      setSpecies("");
      setBreed("");
      setDob("");

      // Optionnel : retourner à la page /pets
      navigate("/pets");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l'animal");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Ajouter un animal</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" required/>
        <input type="text" placeholder="Espèce" value={species} onChange={e=>setSpecies(e.target.value)} className="p-2 border rounded" required/>
        <input type="text" placeholder="Race" value={breed} onChange={e=>setBreed(e.target.value)} className="p-2 border rounded"/>
        <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Ajouter</button>
      </form>
    </div>
  );
}