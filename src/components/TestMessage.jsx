// frontend-app/src/components/TestMessage.jsx
import React, { useState } from "react";

export default function TestMessage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", border: "1px solid #333" }}>
      <h2>Test Chat</h2>
      <div style={{ minHeight: "100px", border: "1px solid #aaa", padding: "10px", marginBottom: "10px" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "5px 0" }}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire un message..."
        style={{ width: "calc(100% - 80px)", marginRight: "10px" }}
      />
      <button onClick={handleSend}>Envoyer</button>
    </div>
  );
}