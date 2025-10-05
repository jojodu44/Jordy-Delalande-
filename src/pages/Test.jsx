import React, { useEffect, useState } from "react";
import API from "../api/axios";
import PetCard from "../components/PetCard";

export default function Test() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await API.get("/pets");
        setPets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mes animaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.length === 0 ? (
          <div>Aucun animal trouvé</div>
        ) : (
          pets.map(pet => <PetCard key={pet._id} pet={pet} />)
        )}
      </div>
    </div>
  );
}
