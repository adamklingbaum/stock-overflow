import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Stock Overflow</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>My portfolios</Nav.Link>
          <Nav.Link>Stock lookup</Nav.Link>
          <Nav.Link>News</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
