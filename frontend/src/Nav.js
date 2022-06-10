import {Navbar, Container, Nav, Form, Button} from 'react-bootstrap';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
function MyNavbar() {
  let navigate = useNavigate();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={()=>navigate('/')}>ReSee</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>navigate('/')}>템플릿</Nav.Link>
            <Nav.Link onClick={()=>navigate('/')}>공유</Nav.Link>
            <Nav.Link onClick={()=>navigate('/')}>계시판</Nav.Link>
          </Nav>
					<Nav>
						<Nav.Link href="#login">로그인</Nav.Link>
						<Nav.Link href="#register">회원가입</Nav.Link>
					</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;