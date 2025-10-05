export default function PetCard({ pet }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{pet.name}</h2>
      <p>Espèce : {pet.species}</p>
      <p>Race : {pet.breed || "N/A"}</p>
      <p>Date de naissance : {pet.dob ? new Date(pet.dob).toLocaleDateString() : "N/A"}</p>
    </div>
  );
}