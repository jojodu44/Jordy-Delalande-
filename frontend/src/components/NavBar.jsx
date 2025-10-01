import React from "react";

export default function NavBar({ onSelect, activePage }) {
  const tabs = [
    { key: "dashboard", label: "Dashboard" },
    { key: "guide", label: "Guide" },
    { key: "documents", label: "Documents" },
    { key: "premium", label: "Premium" },
  ];

  return (
    <nav className="bg-white shadow-md p-4 flex justify-around">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelect(tab.key)}
          className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200
            ${
              activePage === tab.key
                ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
