import React, { useEffect, useState } from "react";
import { getUsers } from "../api";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUsers(token)
        .then(res => setUsers(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      {users.map(u => (
        <div key={u._id} className="card flex justify-between items-center">
          <span>{u.email}</span>
          <button className="px-3 py-1 bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-md">Accompagner</button>
        </div>
      ))}
    </div>
  );
}