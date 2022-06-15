import axios from 'axios';
import { useEffect, useState } from 'react';
import {Navbar, Container, Nav,} from 'react-bootstrap';
import { Routes, Route, useNavigate,  } from 'react-router-dom';
import Login from '../router/login/Login';
import Sign_up from '../router/sign_up/Sign_up';
import { getCookie } from '../utils/cookie';



function MyNavbar() {
	let navigate = useNavigate();
	let [auth, setAuth] = useState('')
	useEffect(() => {
		if (localStorage.getItem('token') !== null){
			setAuth(true);
		}
	}, [])

	// const handleLogout = () =>{
	// 	let SessionId = getCookie('sessionid')

	// 	axios.post("http://127.0.0.1:8000/api/UserLogout/", SessionId)
	// 	.then(res => {
	// 		localStorage.clear()
	// 		// window.location.replace('/')
	// 	})
	// }
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
					{auth ?
						<Nav>
							<Nav.Link onClick={()=>navigate('/profile')}>개인정보</Nav.Link>
							
						</Nav>
						:
						<Nav>
							<Nav.Link onClick={()=>navigate('/login')}>로그인</Nav.Link>
							<Nav.Link onClick={()=>navigate('/sign_up')}>회원가입</Nav.Link>
						</Nav>
					}
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Routes>
				<Route path="/" element={
						<div className="hero-image">
							<div className="hero-text">
								<h1>뭔가 머리에 안남는다면</h1>
								<p>일단 다시봐보는건 어떨까?</p>
								<button className='hero-button'><a href='/sign_up' style={{textDecoration: 'none', color:"white"}}>회원가입</a></button>
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
