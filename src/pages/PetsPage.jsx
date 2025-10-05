import React, { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import PetCard from "../components/PetCard";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchPets = async () => {
    try {
      const res = await API.get("/pets");
      setPets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [token]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Mes animaux</h1>
        <Link
          to="/add-pet"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Ajouter un animal
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.length === 0 ? (
          <div>Aucun animal trouvé</div>
        ) : (
          pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
        )}
      </div>
    </div>
  );
}

