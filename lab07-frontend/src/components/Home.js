import React from "react";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 border shadow-sm">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold text-primary">Bienvenido al Laboratorio 07</h1>
          <p className="col-md-12 fs-4">
            Esta es una aplicación Full Stack construida con <strong>React</strong> y <strong>Node.js</strong>.
            Utiliza autenticación basada en <strong>JWT</strong> y gestión de <strong>Refresh Tokens</strong>.
          </p>
          <hr className="my-4" />
          <p>Explora las funcionalidades de Administrador, Moderador o Usuario según tus permisos.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Saber más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;