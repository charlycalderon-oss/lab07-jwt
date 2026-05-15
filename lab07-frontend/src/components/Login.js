import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Login = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");

  // Esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setMessage("");

    AuthService.login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload(); // Para refrescar la Navbar
      },
      (error) => {
        const resMessage = error.response?.data?.message || error.message || error.toString();
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container p-4 shadow-sm mx-auto" style={{ maxWidth: "400px", marginTop: "50px" }}>
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card rounded-circle mx-auto d-block mb-3"
          width="96"
        />

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="username">Usuario</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage name="username" component="div" className="text-danger small" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Contraseña</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger small" />
            </div>

            <div className="form-group d-grid">
              <button type="submit" className="btn btn-primary btn-block">
                <span>Ingresar</span>
              </button>
            </div>

            {message && (
              <div className="form-group mt-3">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;