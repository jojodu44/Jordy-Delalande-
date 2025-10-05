// src/pages/Messages.jsx
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";

export default function MessagesPage() {
  const [selected, setSelected] = useState({ name: "Alex", userId: 1 });

  return (
    <div className="p-4 flex gap-6">
      <div className="w-64">
        <h2>Conversations</h2>
        <ul>
          <li>
            <button onClick={() => setSelected({ name: "Alex", userId: 1 })}>
              Alex
            </button>
          </li>
          <li>
            <button onClick={() => setSelected({ name: "Léa", userId: 2 })}>
              Léa
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <ChatBox meId={123} otherUser={selected} />
      </div>
    </div>
  );
}
