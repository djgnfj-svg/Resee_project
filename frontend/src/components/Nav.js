import axios from 'axios';
import { useEffect, useState } from 'react';
import {Navbar, Container, Nav,} from 'react-bootstrap';
import { Routes, Route, useNavigate,  } from 'react-router-dom';



function MyNavbar() {
	let navigate = useNavigate();
	let [auth, setAuth] = useState(false)
	let [test,setTest] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('token') !== null){
			setAuth(true);
		}else {
			setAuth(false)
		}
	}, [localStorage.getItem('token')])

	const handleLogout = ()=>{
		console.log(`Token ${localStorage.getItem('token')}`)
		axios.get("http://127.0.0.1:8000/api/UserLogout/",{
				headers:{
					Authorization : `Token ${localStorage.getItem('token')}`
			}
		}).then(data=>{
			localStorage.clear();
			navigate("/");
			setAuth(false);
		})
	}
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
					<Nav.Link onClick={()=>navigate('/board')}>게시판</Nav.Link>
					</Nav>
					{auth ?
						<Nav>
							<Nav.Link onClick={() => navigate('/profile')}>개인정보</Nav.Link>
							<Nav.Link onClick={handleLogout}>로그아웃</Nav.Link>
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
		</div>
	);
}

export default MyNavbar;
