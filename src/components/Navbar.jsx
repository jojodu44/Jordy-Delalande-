import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-3 flex justify-between">
      <div>
        <Link to="/dashboard" className="mr-4 font-bold">Mon Santé Animal</Link>
        <Link to="/pets" className="mr-3">Mes animaux</Link>
        <Link to="/messages" className="mr-3">Messages</Link>
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded">
            Déconnexion
          </button>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </div>
    </nav>
  );
}
