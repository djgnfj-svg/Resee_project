import './Sign_up.css'
import axios from 'axios'
import { FocusEvent, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import {EmailCheckUrl , SignUpUrl} from '../../../components/ApiUrl'
import React from 'react'


function Sign_up() {

	const navigate = useNavigate();

	const [erroruserNickname  , setErroruserNickname] = useState(false);
	const [errorUserEmail  , setErrorUserEmail] = useState(false);
	const [errorUserPassword  , setErrorUserPassword] = useState(false);
	const [errorUserPassword2  , setErrorUserPassword2] = useState(false);

	const [nameUpdated , setNameUpdated] = useState(false)
	const [emailUpdated , setEmailUpdated] = useState(false)
	const [passwordUpdated , setPasswordUpdated] = useState(false)
	const [passwordErrorInId,setPasswordErrorInId] = useState(false)
	const [password2Updated2 , setPassword2Updated] = useState(false)

	const [nameLength , setNameLength] = useState(true)
	const [emailLength , setEmailLength] = useState(false)
	const [passwordLength , setPasswordLength] = useState(false)

	const [email , setEmail] = useState("");
	const [username , setUserName] = useState("");
	const [password1 , setPassword] = useState("");
	const [password2 , setPassword2] = useState("");

	const [overlapEmail , setOverLapEmail] = useState("")

	const BluerUserName = (e: FocusEvent<HTMLInputElement, Element>) => {
		if(e.target.value.length < 1 || e.target.value.length > 11){
			setNameLength(false)
		}else{
			setNameLength(true);
			setNameUpdated(true);
		}
	}

	const BluerEmail = (e: FocusEvent<HTMLInputElement, Element>) => {
		axios.post(EmailCheckUrl,{
			email : email},{
				headers: {
					'Content-Type': 'application/json',
				}
		}).then(res => {
			if(e.target.value.length < 1){
				setEmailLength(false)
			}else{
				setEmailLength(true);
				setEmailUpdated(true);
				
			}
		}).catch(error => {
			if(error.response.data.msg){
				setOverLapEmail(error.response.data.msg)
			}
			console.log(error)
	})
	}

	const BluerPassword = (e: FocusEvent<HTMLInputElement, Element>) => {
		if(e.target.value.length < 1){
			setPasswordLength(false)
		}else{
			setPasswordLength(true);
			setPasswordUpdated(true);
		}
		bluerPaasword2()
	}

	const bluerPaasword2 = () =>{
		if(password2 !== password1){
			setErrorUserPassword2(true)
		}
	}


	const onChangeuserName = (e: { target: { value: string; }; }) =>  {

		const usernameRegex = new RegExp("^[a-zA-Z0-9가-힣ㄱ-ㅎ]{1,}$");
		
		if((!e.target.value || (usernameRegex.test(e.target.value)))){
			setErroruserNickname(false)
			setNameUpdated(false)
			setNameLength(true);
		}else{
			setErroruserNickname(true)
		}
		setUserName(e.target.value);
	};

	const onChangeEmail = (e: { target: { value: string; }; }) =>  {
		const emailRegex = new RegExp("^[a-zA-Z0-9+-.]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$");
		
		if((!e.target.value || (emailRegex.test(e.target.value)))){
			setErrorUserEmail(false)
			setEmailUpdated(false)
		}else{
			setErrorUserEmail(true)
		}
		setOverLapEmail("");
		setEmail(e.target.value);
	};

	const onChangepassword = (e: { target: { value: string; }; }) =>  {

		const passwordRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$")
		const appTest = email.split("@")[0];

		if((!e.target.value || (passwordRegex.test(e.target.value)))){
			setErrorUserPassword(false)
			setPasswordUpdated(false)
			setPasswordErrorInId(false)
		}else if(e.target.value.search(appTest) !== -1 && appTest.length >= 1){
			setPasswordErrorInId(true)
			console.log(appTest)
		}else{
			setErrorUserPassword(true)
		}

		if(e.target.value !== password2) {
			setErrorUserPassword2(false)
			setPassword2Updated(true);
		
		}else{
			setErrorUserPassword2(true)
			setPassword2Updated(false);
		}
		setPassword(e.target.value);
	};

	const onChangepassword2 = (e: { target: { value: string; }; }) =>  {	
		if(e.target.value === password1 ){
			setErrorUserPassword2(false)
			setPassword2Updated(true);
		
		}else{
			setErrorUserPassword2(true)
			setPassword2Updated(false);
			
		}
		setPassword2(e.target.value);
	};

	const Sign_up_button = (e: { preventDefault: () => void; })=>{
		e.preventDefault();
		axios.post(SignUpUrl,{
			email : email,
			username : username, 
			password1 : password1,
			password2 : password2
		})
		.then(res =>{
			alert("환영해요 :)")
			navigate("/sign_up/emailcheck")
		})
		.catch(error => {
			alert(error.response.data.non_field_errors)
		})
	};

	return (
		<main className="sign_up_main">
			<form className="form_class">
				<div className='sign_title'>가입하기</div>
				<div className="form_div">

					<label>닉네임</label>
					{erroruserNickname === false && nameUpdated && nameLength && 
						<span className='succes_check'>
							<img alt='img'  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input className={nameLength ? "field_class" : "field_errorClass"} onBlur={(e) => BluerUserName(e)}  placeholder="ex) 홍길동" autoFocus onChange={onChangeuserName} value={username}  />
					{nameLength===false && 
					<>
						<div className='blank_txt'>2글자 이상 10글자 이하로 입력해주세요</div>
					</>
					 }
					{erroruserNickname &&
						<div className='errorMsg'>
							닉네임에 ^,@,#,% 등의 특수문자를 포함할 수 없습니다.
						</div>
					}

					<label>이메일</label>
					{errorUserEmail === false && emailUpdated  && emailLength && overlapEmail === "" &&
						<span className='succes_check'>
							<img alt='img'  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name='email' className="field_class" onBlur={(e) => BluerEmail(e)} type="text" placeholder="ex) hong@test.com" onChange={onChangeEmail} value={email} />
					{errorUserEmail &&
						<div className='errorMsg'>
							올바른 이메일 형식이 아닙니다.
						</div>
					}
					{overlapEmail !== "" &&
						<div className='errorMsg'>
							이미 존재하는 이메일 입니다.
						</div>
					}

					<label>비밀번호</label>
					{errorUserPassword === false && passwordUpdated && passwordLength &&
						<span className='succes_check'>
							<img alt='img'  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name="password" id="pass" onBlur={(e) => BluerPassword(e)} className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={onChangepassword} value={password1} />
					{errorUserPassword &&
						<div className='errorMsg'>
							8글자 이상의 영어 , 숫자 및 특수문자(!,@,#,$,%,^,*,+,=,- )를 포함한 비밀번호를 입력해주세요
						</div>
					}
					{passwordErrorInId &&
						<div className='errorMsg'>
							비밀번호에 이메일을 포함할 수 없습니다.
						</div>
					}

					<label>비밀번호 확인</label>
					{errorUserPassword2 === false && password2Updated2 &&
						<span className='succes_check'>
							<img alt='img'  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name="password2" id="pass" className="field_class" type="password" placeholder="비밀번호를 입력하세요" onChange={onChangepassword2} value={password2} />
					{errorUserPassword2 &&
						<div className='errorMsg'>
							비밀번호가 다릅니다.
						</div>
					}
					
					<div className="sign_welcome" hidden={ password2Updated2   && nameLength && emailLength && passwordLength && erroruserNickname === false && errorUserEmail === false && errorUserPassword2 === false && errorUserPassword === false ? false : true} >가입을 환영해요 : )</div>
					<button className="submit_class" onClick={Sign_up_button} disabled={ password2Updated2  && nameLength && emailLength && passwordLength && erroruserNickname === false && errorUserEmail === false && errorUserPassword2 === false && errorUserPassword === false ? false : true} >회원가입</button>
				</div>
				<div className="info_div">
					<p>이미회원이라면 <a href="/login">로그인</a></p>
				</div>
			</form>
		</main>
	);
}

export default Sign_up;