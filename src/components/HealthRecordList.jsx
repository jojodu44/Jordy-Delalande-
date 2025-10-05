import React from "react";

export default function HealthRecordList({ records }) {
  if (!records || records.length === 0) {
    return <div>Aucune fiche de santé</div>;
  }

  return (
    <div className="space-y-2">
      {records.map((record) => (
        <div key={record._id} className="border p-2 rounded bg-gray-50">
          <p><strong>Date :</strong> {new Date(record.date).toLocaleDateString()}</p>
          <p><strong>Type :</strong> {record.type}</p>
          {record.vet && <p><strong>Vétérinaire :</strong> {record.vet}</p>}
          {record.notes && <p><strong>Notes :</strong> {record.notes}</p>}
        </div>
      ))}
    </div>
  );
}