import {Navbar, Container, Nav,} from 'react-bootstrap';
import { Routes, Route, Link, useNavigate,BrowserRouter } from 'react-router-dom';
import Login from '../router/login/Login';
import Sign_up from '../router/sign_up/Sign_up';
function MyNavbar() {
  let navigate = useNavigate();
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate('/')}>ReSee</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link onClick={()=>navigate('/')}>템플릿</Nav.Link>
          <Nav.Link onClick={()=>navigate('/sharing')}>공유</Nav.Link>
          <Nav.Link onClick={()=>navigate('/board')}>계시판</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link onClick={()=>navigate('/login')}>로그인</Nav.Link>
          <Nav.Link onClick={()=>navigate('/sign_up')}>회원가입</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
          <Route path="/" element={
              <div class="hero-image">
              <div class="hero-text">
                <h1>I am John Doe</h1>
                <p>And I'm a Photographer</p>
                <button class='hero-button'>Hire me</button>
              </div>
            </div>
            }/>
          <Route path="/login" element={<Login />}/>
          <Route path="/sign_up" element={<Sign_up />}/>
          <Route path="*" element={<div>test</div>}/>
      </Routes>
    </div>
  );
}

export default MyNavbar;