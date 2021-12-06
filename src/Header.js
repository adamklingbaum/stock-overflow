import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Stock Overflow</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>Link 1</Nav.Link>
          <Nav.Link>Link 2</Nav.Link>
          <Nav.Link>Link 3</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
