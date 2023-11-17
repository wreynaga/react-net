import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Container className="p-4 bg-white mt-5">
      <Outlet />
    </Container>
  );
}
