import React, { useState, useEffect } from "react";
import api from "../services/api";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get("/test/user").then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data) || error.message || error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container mt-4">
      <div className="card border-info">
        <div className="card-header bg-info text-white">Contenido de Usuario</div>
        <div className="card-body">
          <h5 className="card-title">Bienvenido Usuario Autorizado</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;