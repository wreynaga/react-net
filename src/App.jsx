import Container from "react-bootstrap/Container";
import Users from "./pages/users";
import UserAdd from "./pages/user";

function App() {
  return (
    <Container className="p-5">
      <Users />
      <UserAdd />
    </Container>
  );
}

export default App;
