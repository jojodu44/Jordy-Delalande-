// frontend/src/pages/SubscriptionPage.jsx
import React from "react";
import API from "../api/axios";

export default function SubscriptionPage() {
  const handleSubscribe = async (plan) => {
    try {
      const res = await API.post("/subscription/create-checkout-session", { plan });
      // redirige vers Stripe Checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la création du paiement");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Abonnement</h1>
      <div className="flex flex-col gap-3">
        <button onClick={() => handleSubscribe("basic")} className="p-3 border rounded">Basique — 19€/mois</button>
        <button onClick={() => handleSubscribe("pro")} className="p-3 border rounded">Pro — 49€/mois</button>
        <button onClick={() => handleSubscribe("premium")} className="p-3 border rounded">Premium — 99€/mois</button>
      </div>
    </div>
  );
}