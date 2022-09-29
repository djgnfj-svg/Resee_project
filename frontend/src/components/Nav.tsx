import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { useNavigate, useLocation, } from 'react-router-dom';
import isLogin from './isLogin';
import '../App.css'
import { LogoutUrl } from './ApiUrl';


function MyNavbar() {
	let navigate = useNavigate();
	const location = useLocation()

	const [auth, setAuth] = useState(false)
	const [home , setHome] = useState(false)
	
	useEffect(() => {
		if(location.pathname === '/'){
			setHome(true)
		}else {
			setHome(false)
		}
	},[location])

	useEffect(()=>{
		if(!!isLogin()){
			setAuth(true)
		}else{
			setAuth(false)
		}
        //eslint-disable-next-line
	},[localStorage.getItem('access_token')])
	
		

	const handleLogout = () => {
		axios.post(LogoutUrl , {
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
			<Navbar className={home ? 'NavNoneBackground' : 'NavBackgrond'}
			>
				<Container>
					<Navbar.Brand style={home ? {fontSize:"30px" , color:"#cf8360" , fontWeight:"600"} : {fontSize:"30px",color:"black"}} onClick={() => navigate('/')}>ReSee</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto" style={{marginLeft:"30px"}}>
							<Nav.Link style={home ? {fontSize:"23px" ,color:"#755139" } : {fontSize:"23px",color:"red"}}  onClick={() => navigate("/board")}>Books</Nav.Link>
						</Nav>
						{auth ?
							<Nav>
								<Nav.Link style={{ fontSize:"22px" }} onClick={handleLogout}>
									<img alt='img' style={{ fontSize:"25px",objectFit: "cover", width: "20px", position: "relative", top: "-2px" }} src={`${process.env.PUBLIC_URL}/img/Logout.png`} />
										로그아웃
									</Nav.Link>
							</Nav>
							:
							<Nav>
								<Nav.Link style={{fontSize:"20px"}} onClick={() => navigate('/login')}>로그인</Nav.Link>
								<Nav.Link style={{fontSize:"20px"}} onClick={() => navigate('/sign_up')}>회원가입</Nav.Link>
							</Nav>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default MyNavbar;
