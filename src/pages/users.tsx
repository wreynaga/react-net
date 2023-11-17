import React from "react";
import { Button, Container, Stack, Table } from "react-bootstrap";

import Pagination from "react-bootstrap/Pagination";

// REMOVER ESTE BLOQUE
let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

function Users() {
  return (
    <Container className="p-4 bg-white mt-5">
      <Stack direction="horizontal" gap={2}>
        <h2 className="mb-4">Usuarios registrados</h2>
        <Button className="ms-auto">Agregar usuario</Button>
      </Stack>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Edad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@mail.com</td>
            <td>20</td>
            <td>
              <Button type="button" variant="danger">
                Eliminar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Pagination size="lg">{items}</Pagination>
    </Container>
  );
}

export default Users;
