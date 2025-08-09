import React from "react";
import { updateUser, deleteUser } from "../services/userService";

function Dashboard({ currentUser, setCurrentUser }) {
  if (!currentUser) {
    return (
      <div className="max-w-screen-md mx-auto px-6 py-16">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accès restreint
          </h2>
          <p className="text-gray-600 mb-6">
            Vous devez être connecté pour accéder au tableau de bord.
          </p>
        </div>
      </div>
    );
  }

  const handleUpdate = async () => {
    alert("Fonctionnalité de mise à jour à implémenter");
  };

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUser(currentUser.id);
        alert("Compte supprimé.");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("current_user");
        localStorage.removeItem("oak-caught");
        if (typeof setCurrentUser === "function") setCurrentUser(null);
        window.location.href = "/";
      } catch (err) {
        alert("Erreur lors de la suppression du compte");
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        👤 Tableau de bord
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Informations utilisateur</h2>
        <div className="space-y-4">
          <div>
            <span className="font-medium">Nom d'utilisateur :</span>
            <span className="ml-2">{currentUser.username}</span>
          </div>
          <div>
            <span className="font-medium">Guide en cours :</span>
            <span className="ml-2">
              {currentUser.currentGuide
                ? currentUser.currentGuide
                : "(rien commencé)"}
            </span>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Mettre à jour mes infos
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Supprimer mon compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
