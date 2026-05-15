import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "./services/auth.service";

const Navbar = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <Link to={"/"} className="navbar-brand">Tecsup Lab</Link>
      <div className="navbar-nav mr-auto">
        <li className="nav-item"><Link to={"/home"} className="nav-link">Inicio</Link></li>

        {showModeratorBoard && (
          <li className="nav-item"><Link to={"/mod"} className="nav-link">Panel Mod</Link></li>
        )}

        {showAdminBoard && (
          <li className="nav-item"><Link to={"/admin"} className="nav-link">Panel Admin</Link></li>
        )}
      </div>

      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item"><Link to={"/profile"} className="nav-link">{currentUser.username}</Link></li>
          <li className="nav-item"><a href="/login" className="nav-link" onClick={() => AuthService.logout(currentUser.id)}>Cerrar Sesión</a></li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item"><Link to={"/login"} className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to={"/register"} className="nav-link">Sign Up</Link></li>
        </div>
      )}
    </nav>
  );
};