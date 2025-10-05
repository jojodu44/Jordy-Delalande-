// src/components/ChatBox.jsx
import React, { useState } from "react";

export default function ChatBox({ meId, otherUser }) {
  const [messages, setMessages] = useState([
    { sender: "me", content: "Salut !" },
    { sender: "other", content: `Salut ${otherUser.name} !` }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { sender: "me", content: input }]);
    setInput("");
  };

  return (
    <div style={{ border: "1px solid gray", padding: "1rem" }}>
      <h3>Chat avec {otherUser.name}</h3>
      <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "me" ? "right" : "left" }}>
            <span style={{ background: "#eee", padding: "0.3rem 0.5rem", borderRadius: "5px" }}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Écris un message..."
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}