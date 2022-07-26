import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import isLogin from './isLogin';



function MyNavbar() {
	let navigate = useNavigate();
	let [auth, setAuth] = useState(false)
	const [loginState , setLoginState] = useState(false)

	useEffect(() => {
		if(!!isLogin()){
			setLoginState(true)
			setAuth(true)
		}
	},[localStorage.getItem('aceess_token')])

	
	useEffect(() => {
		async function StateLogin() {
		 if(!loginState && (localStorage.getItem('access_token') !== null || localStorage.getItem('refresh_token') !== null)) {
			localStorage.clear()
			alert("비 정상 접근")
			navigate("/")
			setAuth(false)
		}else if((localStorage.getItem('access_token') === null || localStorage.getItem('refresh_token') === null)){
			setAuth(false)
		}else{
			console.log("hhh")
		}
	}
	StateLogin()
	},[auth])

	const handleLogout = () => {
		axios.post("http://127.0.0.1:8000/api/accounts/logout/", {
			refresh : localStorage.getItem('refresh_token'),
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		}).then(res => {
			localStorage.clear();
			setAuth(false);
			alert("로그아웃 성공")
			navigate("/");
		}).catch(error => {
			alert("당신 무슨 짓을 한거야 !!!")
		})
	}

	return (
		<div>
			<Navbar style={{ backgroundColor: "rgb(230,230,230) "  }}
			>
				<Container>
					<Navbar.Brand onClick={() => navigate('/')}>ReSee</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link onClick={() => navigate("/board")}>게시판</Nav.Link>
						</Nav>
						{auth ?
							<Nav>
								<Nav.Link onClick={handleLogout}><img style={{ objectFit: "cover", width: "20px", position: "relative", top: "-2px" }} src={`${process.env.PUBLIC_URL}/img/Logout.png`} />로그아웃</Nav.Link>
							</Nav>
							:
							<Nav>
								<Nav.Link onClick={() => navigate('/login')}><img style={{ objectFit: "cover", width: "20px", position: "relative", top: "-2px" }} src={`${process.env.PUBLIC_URL}/img/Login.png`} />로그인</Nav.Link>
								<Nav.Link onClick={() => navigate('/sign_up')}>회원가입</Nav.Link>
							</Nav>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default MyNavbar;
