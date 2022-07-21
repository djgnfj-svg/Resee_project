import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import isLogin from './isLogin';




function MyNavbar() {
	let navigate = useNavigate();
	let [auth, setAuth] = useState(false)

	useEffect(() => {
		if(!isLogin()) {
			setAuth(false)
		}else if(!!isLogin()){
			setAuth(true)
		}
	},[!isLogin()])
	

	// useEffect(()=>{
	// 	let 타이머 = setTimeout(()=>{ alert("aaa") }, 2000);
	//  }, []);

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
			<Navbar style={{ backgroundColor: "rgb(207 207 207)" }}
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
