// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import MessagesPage from "./pages/Messages";
import PetsPage from "./pages/PetsPage";
import AddPet from "./pages/AddPet";
import Test from "./pages/Test";

// Composants
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Authentification */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Routes protégées */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />

          {/* Gestion des animaux */}
          <Route path="/pets" element={<PetsPage />} />
          <Route path="/add-pet" element={<AddPet />} />

          {/* Page de test */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}