import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Users, {
  loader as usersLoader,
  actionCreateUser,
  actionDeleteUser,
} from "./routes/users";
import UserAdd from "./routes/user";
import Login, { action as loginAction } from "./routes/login";

import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./routes/root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to={"/login"} replace />} />
      <Route path="/login" element={<Login />} action={loginAction} />

      <Route path="users">
        <Route
          index
          element={<Users />}
          loader={usersLoader}
          action={actionDeleteUser}
        />
        <Route path="add" element={<UserAdd />} action={actionCreateUser} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);