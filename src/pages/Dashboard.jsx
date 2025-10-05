import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Bonjour, {user.name}</h1>
      <div className="flex gap-4">
        <Link to="/pets" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Mes animaux</Link>
        <button onClick={logout} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Déconnexion</button>
      </div>
    </div>
  );
}