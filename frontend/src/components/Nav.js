import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { Routes, Route, useNavigate, } from 'react-router-dom';




function MyNavbar() {
	let navigate = useNavigate();
	let [auth, setAuth] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('access_token') !== null) {
			setAuth(true);
		}
	}, [localStorage.getItem('access_token')])

	const handleLogout = () => {

		axios.get("http://127.0.0.1:8000/api/UserLogout/", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		}).then(data => {
			localStorage.clear();
			navigate("/");
			setAuth(false);
			alert("로그아웃 성공")
		})
	}

	const goTemplate = () => {
		axios.get("http://127.0.0.1:8000/api/Books/", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('access_token')}`
			}
		})
			.then(res => {
				navigate("/board");
			}).catch(res => {
				if(localStorage.getItem('refresh_token') !== null){
					axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
					{
						refresh: localStorage.getItem('refresh_token')
					}
					).then(res => {
						localStorage.setItem('access_token', res.data.access)
						navigate("/board");
					})
				}else{
					navigate("/board")
				}
			});
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
							<Nav.Link onClick={() => goTemplate()}>게시판</Nav.Link>
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
