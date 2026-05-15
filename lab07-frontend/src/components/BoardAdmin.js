import React, { useState, useEffect } from "react";
import api from "../services/api";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [modContent, setModContent] = useState(""); // Estado para el contenido de moderador

  useEffect(() => {
    // Carga inicial del contenido de Admin
    api.get("/test/admin").then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data) || error.message || error.toString();
        setContent(_content);
      }
    );
  }, []);

  // Función para consultar el panel de moderador desde la vista de admin
  const fetchModContent = () => {
    api.get("/test/mod").then(
      (response) => {
        setModContent(response.data);
      },
      (error) => {
        setModContent("No se pudo obtener el contenido de moderador.");
      }
    );
  };

  return (
    <div className="container mt-4">
      <div className="card border-danger mb-4">
        <div className="card-header bg-danger text-white">Panel de Administración Central</div>
        <div className="card-body">
          <h5 className="card-title">Control Total del Sistema</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>

      {/* Sección para que el Admin vea contenido de Moderador */}
      <div className="card border-warning">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <span>Vista de Moderación para Admins</span>
          <button className="btn btn-sm btn-outline-dark" onClick={fetchModContent}>
            Cargar datos de Moderador
          </button>
        </div>
        <div className="card-body">
          {modContent ? (
            <p className="card-text">{modContent}</p>
          ) : (
            <p className="text-muted small">Haz clic en el botón para supervisar el contenido de moderadores.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;