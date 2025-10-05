import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data.user, res.data.token);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} required className="p-2 border rounded"/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="p-2 border rounded"/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required className="p-2 border rounded"/>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">S'inscrire</button>
      </form>
    </div>
  );
}