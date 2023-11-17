import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UserAdd() {
  const [user, setUser] = useState({ nombre: "", correo: "", edad: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos a una función para guardar o procesar
    console.log("Nuevo usuario:", user);
    // También podrías resetear los campos después de procesar los datos
    setUser({ nombre: "", correo: "", edad: "" });
  };

  return (
    <Container className="p-4 bg-white mt-5">
      <h2 className="mb-4">Ingresar usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre" className="mb-4">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            isInvalid
            type="text"
            placeholder="Ingrese nombre"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Ingresa el nombre
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCorreo" className="mb-4">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese correo"
            name="correo"
            value={user.correo}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Ingresa el correo
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEdad" className="mb-4">
          <Form.Label>Edad</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingrese edad"
            name="edad"
            value={user.edad}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Ingresa la edad
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Usuario
        </Button>
      </Form>
    </Container>
  );
}

export default UserAdd;
