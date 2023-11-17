import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Form as FormRouter, redirect } from "react-router-dom";

const LOGIN = `https://305542ede31d.ngrok.app/api/v2/Users/Authenticate`;

export async function action({ request, params }) {
  console.log(request);
  let formData = await request.formData();
  let name = formData.get("userName");
  let password = formData.get("password");

  const login = await fetch(LOGIN, {
    method: "POST",
    body: JSON.stringify({
      userName: name,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { data } = await login.json();

  if (data) {
    localStorage.setItem("token", data.token);
    return redirect("/users");
  }
  return null;
}

function Login() {
  // TO DO: Revisar y eliminar
  const [user, setUser] = useState({ userName: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <h2 className="mb-4">Login</h2>
      <FormRouter method="post">
        <Form.Group controlId="formNombre" className="mb-4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese usuario"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Ingresa el nombre
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCorreo" className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese contraseña"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Ingresa el correo
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Usuario
        </Button>
      </FormRouter>
    </>
  );
}

export default Login;
