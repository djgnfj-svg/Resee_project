import "./Login.css";
import axios from 'axios'
// import CSRFToken from '../../components/CSRF';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function Login() {
	
	const navigate = useNavigate("");
	const [input, setInput] = useState({
		email:"",
		password:"",
	});
	const {email, password} = input;
	const onChange = (e) =>  {
		const {value, name} = e.target;
		setInput({
			...input,
			[name] : value
		});
	};
	const Login_button = (e)=>{
		e.preventDefault();
		axios.post("http://127.0.0.1:8000/api/UserLogin/", input,)
		.then(res =>{
			if (res.data.Token){
				alert("로그인 성공")
				localStorage.clear()
				localStorage.setItem('token', res.data.Token)
				navigate("/");
			}
			}
		)
	};
	return (
		<>
		<main class="login_main">
			<form class="form_class">
			{/* <CSRFToken /> */}
				<div class="form_div">
					<label>이메일:</label>
					<input name='email' className="field_class" type="text" placeholder="이메일주소를 입력하세요" onChange={onChange} value={email} />
					<label>비밀번호:</label>
					<input name="password" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={onChange} value={password} />
					<button className="submit_class" onClick={(e) => Login_button(e)}>로그인</button>
				</div>
				<div class="info_div">
					<p>회원이 아니십니까? <a href="/sign_up">회원가입</a></p>
				</div>
			</form>
		</main>
		</>
	);
}

export default Login;
