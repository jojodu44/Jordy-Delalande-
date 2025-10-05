import React, { useState } from "react";
import { uploadDocument } from "../api";

export default function PDFSend() {
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file); // clé "file" correspond au backend
    uploadDocument(token, formData)
      .then(() => alert("Document envoyé"))
      .catch(err => console.error(err));
  };

  return (
    <div className="card max-w-md mx-auto">
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 rounded-md bg-gradient-to-r from-gradient-start to-gradient-end text-white"
      >
        Envoyer
      </button>
    </div>
  );
}