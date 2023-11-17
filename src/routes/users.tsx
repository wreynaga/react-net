import React, { useState } from "react";
import { Button, Container, Stack, Table } from "react-bootstrap";

import Pagination from "react-bootstrap/Pagination";
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

const CREATE_USER = `https://305542ede31d.ngrok.app/api/v2/Usuarios/Create`;
const GET_USERS = `https://305542ede31d.ngrok.app/api/v2/Usuarios/GetAll`;
const REMOVE_USER = `https://305542ede31d.ngrok.app/api/v2/Usuarios/Delete`;

export async function loader() {
  const users = await fetch(GET_USERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  console.log(users);

  const { data } = await users.json();

  return { users: data };
}

export async function actionCreateUser({ request }) {
  let formData = await request.formData();

  const newuser = {
    nombre: formData.get("nombre"),
    correo: formData.get("correo"),
    edad: formData.get("edad"),
  };

  const adduser = await fetch(CREATE_USER, {
    method: "POST",
    body: JSON.stringify(newuser),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const { data } = await adduser.json();

  if (data) {
    return redirect("/users");
  }

  return null;
}

export async function actionDeleteUser({ params }) {}

function Users() {
  const { users } = useLoaderData();
  const navigate = useNavigate();
  const action = useActionData();

  console.log(action);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = async (userId) => {
    // let { userId } = params;
    const removeuser = await fetch(`${REMOVE_USER}/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const { data } = await removeuser.json();

    if (data) {
      window.location.reload();
    }

    return null;
  };

  return (
    <>
      <Stack direction="horizontal" gap={2}>
        <h2 className="mb-4">Usuarios registrados</h2>
        <Button className="ms-auto" onClick={() => navigate("add")}>
          Agregar usuario
        </Button>
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
          {currentUsers.length > 0 &&
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.edad}</td>
                <td>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
      {/* <Pagination size="lg">{items}</Pagination> */}
    </>
  );
}

export default Users;
