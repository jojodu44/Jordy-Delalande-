import React from "react";

export default function Notifications() {
  const notifications = [
    "Rappel : CAF à compléter",
    "Rappel : Impôts à envoyer",
  ];

  return (
    <div className="space-y-4">
      {notifications.map((n, idx) => (
        <div key={idx} className="card">{n}</div>
      ))}
    </div>
  );
}