import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // VALIDACIONES FRONT-END (Tarea)
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "El usuario debe tener entre 3 y 20 caracteres.",
        (val) => val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("Este campo es obligatorio!"),
    email: Yup.string()
      .email("Esto no es un email válido.")
      .required("Este campo es obligatorio!"),
    password: Yup.string()
      .test(
        "len",
        "La contraseña debe tener entre 6 y 40 caracteres.",
        (val) => val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("Este campo es obligatorio!"),
  });

  const handleRegister = (formValue) => {
    const { username, email, password } = formValue;
    setMessage("");
    setSuccessful(false);

    // Por defecto registramos como "user", pero podrías añadir un selector de roles
    AuthService.register(username, email, password, ["user"]).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  return (
    <div className="col-md-12">
      <div className="card card-container p-4 shadow-sm mx-auto" style={{ maxWidth: "450px" }}>
        <h3 className="text-center mb-4">Registro</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group mb-3">
                  <label htmlFor="username">Usuario</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger small" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="password">Contraseña</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>

                <div className="form-group d-grid">
                  <button type="submit" className="btn btn-success">Registrarse</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group mt-3">
                <div className={`alert ${successful ? "alert-success" : "alert-danger"}`} role="alert">
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

export default Register;