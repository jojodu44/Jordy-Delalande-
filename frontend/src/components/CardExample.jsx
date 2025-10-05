import React from "react";

const CardExample = ({ title, description }) => {
  return (
    <div className="card max-w-sm mx-auto my-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default CardExample;