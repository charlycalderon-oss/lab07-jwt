import React from "react";
import { Navigate } from 'react-router-dom';

const Profile = () => {
  // Obtenemos el usuario del LocalStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Si no hay usuario (alguien intenta entrar por URL sin loguearse), redirigir a Login
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm">
        <header className="jumbotron">
          <h3>
            Perfil de: <strong>{currentUser.username}</strong>
          </h3>
        </header>
        
        <div className="mt-3">
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <p>
            <strong>Tus Roles:</strong>
          </p>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => <li key={index} className="badge bg-info text-dark me-1">{role}</li>)}
          </ul>
        </div>

        <hr />

        <div className="bg-light p-3 rounded">
          <p className="text-break">
            <strong>Access Token (Corta duración):</strong><br />
            <small className="text-muted">{currentUser.accessToken.substring(0, 20)} ... {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}</small>
          </p>
          <p className="text-break">
            <strong>Refresh Token (Larga duración):</strong><br />
            <small className="text-success">{currentUser.refreshToken}</small>
          </p>
        </div>
        
        <div className="mt-3">
            <p className="small text-muted">ID de Usuario: {currentUser.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;