import React, { useState } from 'react';

export default function Reminders({ pets, reminders, onAdded }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [petId, setPetId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !petId) return alert('Remplissez tous les champs');
    const pet = pets.find(p => p._id === petId);
    onAdded({ title, date, pet });
    setTitle('');
    setDate('');
    setPetId('');
  };

  return (
    <div className="p-2 border rounded">
      <h2 className="text-lg mb-2">Rappels</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          placeholder="Titre du rappel" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="block mb-2 p-2 border rounded w-full"
        />
        <input 
          type="datetime-local" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          className="block mb-2 p-2 border rounded w-full"
        />
        <select 
          value={petId} 
          onChange={e => setPetId(e.target.value)} 
          className="block mb-2 p-2 border rounded w-full"
        >
          <option value="">Choisir un animal</option>
          {pets.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Ajouter
        </button>
      </form>

      <ul>
        {reminders.map(r => (
          <li key={r._id}>{r.title} - {new Date(r.date).toLocaleString()} ({r.pet.name})</li>
        ))}
      </ul>
    </div>
  );
}