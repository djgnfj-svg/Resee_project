import './Sign_up.css'
import axios from 'axios'
import CSRFToken from '../../components/CSRF';
import { useState } from 'react';


function Sign_up() {
	const [input, setInput] = useState({
		email:"",
		username:"",
		password:"",
	});
	const {username, email, password} = input;
	const onChange = (e) =>  {
		const {value, name} = e.target;
		setInput({
			...input,
			[name] : value
		});
	};

	const Sign_up_button = ()=>{
		axios.post("http://127.0.0.1:8000/api/UserSignUp/", input)
		.then(res =>{
				console.log(res.data)
				console.log(res.data.Token)
			if (res.data.Token){
				localStorage.clear()
				localStorage.setItem('token', res.data.Token)
				window.location.replace('/')
				console.log(res.data.key)
				console.log("성공함")
				alert("멈취!")
			}else{
				localStorage.clear()
				console.log("설마 여기로온다고?")
				alert("멈춰요!")
			}
		}
		)
		.catch(error => {
			if (!error.response) {
				// network error
				this.errorStatus = 'Error: Network Error';
			} else {
				this.errorStatus = error.response.data.message;
			}
		})
	};
	return (
		<main className="sign_up_main">
			<form className="form_class">
			<CSRFToken />
				<div className="form_div">
					<label>닉네임:</label>
					<input name="username"className="field_class" type="text" placeholder="닉네임을 입력하세요" autoFocus onChange={onChange} value={username}/>
					<label>이메일:</label>
					<input name='email' className="field_class" type="text" placeholder="이메일주소를 입력하세요" onChange={onChange} value={email} />
					<label>비밀번호:</label>
					<input name="password" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={onChange} value={password} />
					<button className="submit_class" onClick={Sign_up_button}>회원가입</button>
				</div>
				<div className="info_div">
					<p>이미회원이라면 <a href="/login">로그인</a></p>
				</div>
			</form>
		</main>
	);
}

export default Sign_up;