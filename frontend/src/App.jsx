// frontend/src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Guide from "./components/Guide";
import PDFSend from "./components/PDFSend";
import Premium from "./components/Premium";
import Auth from "./components/Auth";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("home"); // home, dashboard, guide, documents, premium

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setPage("home");
  };

  const handleStartGuide = () => setPage("guide");

  const renderPage = () => {
    if (!token) return <Auth onLogin={handleLogin} />;
    switch (page) {
      case "home":
        return <Home onStart={handleStartGuide} />;
      case "dashboard":
        return <Dashboard />;
      case "guide":
        return <Guide onComplete={() => setPage("dashboard")} />;
      case "documents":
        return <PDFSend />;
      case "premium":
        return <Premium />;
      default:
        return <Home onStart={handleStartGuide} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      {token && <NavBar onSelect={setPage} activePage={page} />}
      <main className="flex-1 p-6">{renderPage()}</main>
      {token && (
        <footer className="p-6 text-right bg-white shadow-md">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Déconnexion
          </button>
        </footer>
      )}
    </div>
  );
}