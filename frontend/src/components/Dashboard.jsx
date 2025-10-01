import React, { useEffect, useState } from "react";
import { getDemarches } from "../api";

export default function Dashboard() {
  const [demarches, setDemarches] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getDemarches(token)
        .then(res => setDemarches(res.data))
        .catch(err => console.error(err));
    }
  }, [token]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {demarches.map(d => (
        <div key={d.id} className="card">
          <h3 className="font-bold">{d.title}</h3>
          <p className="text-gray-500">{d.status}</p>
        </div>
      ))}
    </div>
  );
}