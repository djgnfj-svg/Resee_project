import "./Login.css";
import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import React from "react";

function Login() {

	type Input = {
		email:string; 
		password? : string;
	}
	
	const navigate = useNavigate();
	const [input, setInput] = useState<Input>({
		email :"",
		password:"",
	});

	
	const [useEmailError,setUserEmailError] = useState(false)

	const {email, password} = input;

	
	const onChange = (e: { target: { name: string; value: string; }; }) =>  {
		let i = 10;
		const {name , value} = e.target
		setInput({
			...input ,
			[name] : value
		});
	};

	const handleEmailChangeInput = (e: { target: { value: string; }; }) => {
		const userEmailRegex = new RegExp('^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
		if((!e.target.value || (userEmailRegex.test(e.target.value)))){
			setUserEmailError(false);
		}
		else{
			setUserEmailError(true)
		}
		setInput({
			email : e.target.value,
		});
	}
	
	const Login_button = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
		e.preventDefault();
		axios.post("http://127.0.0.1:8000/api/accounts/login/", input)
		.then(res =>{
			if (res.data.access_token){
				alert("로그인 성공")
				localStorage.setItem('access_token', res.data.access_token)
				localStorage.setItem('refresh_token', res.data.refresh_token)
				navigate("/")
			}
			}
		).catch(res =>{
			alert("가입되지않은 이메일 또는 비밀번호가 틀립니다.");
		})
	};

	return (
		<>
		<main className="login_main">
			<form className="form_class" style={{backgroundColor:"white"}}>
			{/* <CSRFToken /> */}
				<div className="form_div">
					<div className="social_login">
						<div className="social_google">
							<img src={`${process.env.PUBLIC_URL}/img/btn_google.png`} />
							<span>Google로 진행하기</span>
						</div>
						<div className="social_naver">
							<img src={`${process.env.PUBLIC_URL}/img/btn_naver.png`} />
							<span>Naver로 진행하기</span>
						</div>
					</div>
					<hr />
					<label>이메일:</label>
					<input name='email' className="field_class" type="text" placeholder="Email@example.com" onChange={handleEmailChangeInput} value={email} />
					{
						useEmailError && 
						<div style={{fontSize:"14px" , marginTop:"-12px" , marginBottom:"10px" , paddingLeft:"0.5rem" , color:"red"}}>올바른 이메일 형식이 아닙니다.</div>
					}
					<label>비밀번호:</label>
					<input name="password" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={onChange} value={password} />
					<button className="submit_class" style={{backgroundColor:"2a9f5c"}} onClick={(e) => Login_button(e)}>로그인</button>
				</div>
				<div className="info_div">
					<p>ReSee가 처음이신가요?</p>
					<a href="#" onClick={() => navigate("/sign_up")}>가입하기</a>
				</div>
			</form>
		</main>
		</>
	);
}

export default Login;
