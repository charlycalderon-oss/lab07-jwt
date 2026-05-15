import React, { useState, useEffect } from "react";
import api from "../services/api";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    api.get("/test/mod").then(
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
      <div className="card border-warning">
        <div className="card-header bg-warning text-dark">Panel de Moderación</div>
        <div className="card-body">
          <h5 className="card-title">Acceso para Moderadores</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default BoardModerator;