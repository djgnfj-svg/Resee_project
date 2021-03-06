import './Sign_up.css'
import axios from 'axios'
import CSRFToken from '../../components/CSRF';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'


function Sign_up() {

	const navigate = useNavigate("");

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

	const BluerUserName = (e) => {
		if(e.target.value.length < 1){
			setNameLength(false)
		}else{
			setNameLength(true);
			setNameUpdated(true);
		}
	}

	const BluerEmail = (e) => {
		{console.log(overlapEmail)}
		axios.post('http://127.0.0.1:8000/api/emailcheck/',{
			email : email,
		}).then(res => {
			if(e.target.value.length < 1){
				setEmailLength(false)
			}else{
				setEmailLength(true);
				setEmailUpdated(true);
				
			}
		}).catch(error => {
			setOverLapEmail(error.response.data.msg)
			console.log(error)
	})
	}

	const BluerPassword = (e) => {
		if(e.target.value.length < 1){
			setPasswordLength(false)
		}else{
			setPasswordLength(true);
			setPasswordUpdated(true);
		}
		bluerPaasword2()
	}

	const bluerPaasword2 = (e) =>{
		if(password2 !== password1){
			setErrorUserPassword2(true)
		}
	}


	const onChangeuserName = (e) =>  {

		const usernameRegex = new RegExp("^[a-zA-Z0-9???-??????-???]{1,10}$");
		
		if((!e.target.value || (usernameRegex.test(e.target.value)))){
			setErroruserNickname(false)
			setNameUpdated(false)
			setNameLength(true);
		}else{
			setErroruserNickname(true)
		}
		setUserName(e.target.value);
	};

	const onChangeEmail = (e) =>  {
		const emailRegex = new RegExp("^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
		
		if((!e.target.value || (emailRegex.test(e.target.value)))){
			setErrorUserEmail(false)
			setEmailUpdated(false)
		}else{
			setErrorUserEmail(true)
		}
		setOverLapEmail("");
		setEmail(e.target.value);
	};

	const onChangepassword = (e) =>  {

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

	const onChangepassword2 = (e) =>  {	
		if(e.target.value === password1 ){
			setErrorUserPassword2(false)
			setPassword2Updated(true);
		
		}else{
			setErrorUserPassword2(true)
			setPassword2Updated(false);
			
		}
		setPassword2(e.target.value);
	};

	const Sign_up_button = (e)=>{
		e.preventDefault();
		axios.post('http://127.0.0.1:8000/api/accounts/',{
			email : email,
			username : username, 
			password1 : password1,
			password2 : password2
		})
		.then(res =>{
			if (res.data.access_token){
				alert("???????????? ??????!")
				localStorage.setItem('access_token', res.data.access_token)
				localStorage.setItem('refresh_token', res.data.refresh_token)
				navigate("/")
			}else{
				localStorage.clear()
			}
		})
		.catch(error => {
			console.log(error.response.data)
			alert(error.response.data.email)
			if (!error.response) {
				this.errorStatus = 'Error: Network Error';
			} else {
				this.errorStatus = error.response.data.message;
			}
		})
	};

	return (
		<main className="sign_up_main">
			<form className="form_class">
				<div className='sign_title'>????????????</div>
				<div className="form_div">

					<label>?????????</label>
					{erroruserNickname === false && nameUpdated && nameLength && 
						<span className='succes_check'>
							<img  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input className={nameLength ? "field_class" : "field_errorClass"} onBlur={(e) => BluerUserName(e)} type="text" placeholder="???????????? ???????????????" autoFocus onChange={onChangeuserName} value={username} maxLength="10" />
					{nameLength===false && 
					<>
						<div className='blank_txt'>?????? ?????? ???????????????</div>
					</>
					 }
					{erroruserNickname &&
						<div className='errorMsg'>
							???????????? ^,@,#,% ?????? ??????????????? ????????? ??? ????????????.
						</div>
					}

					<label>?????????</label>
					{errorUserEmail === false && emailUpdated  && emailLength && overlapEmail === "" &&
						<span className='succes_check'>
							<img  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name='email' className="field_class" onBlur={(e) => BluerEmail(e)} type="text" placeholder="?????????????????? ???????????????" onChange={onChangeEmail} value={email} />
					{errorUserEmail &&
						<div className='errorMsg'>
							????????? ????????? ????????? ????????????.
						</div>
					}
					{overlapEmail !== "" &&
						<div className='errorMsg'>
							?????? ???????????? ????????? ?????????.
						</div>
					}

					<label>????????????</label>
					{errorUserPassword === false && passwordUpdated && passwordLength &&
						<span className='succes_check'>
							<img  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name="password" id="pass" onBlur={(e) => BluerPassword(e)} className="field_class" type="password" placeholder="??????????????? ???????????????" onChange={onChangepassword} value={password1} />
					{errorUserPassword &&
						<div className='errorMsg'>
							8?????? ????????? ?????? , ?????? ??? ????????????(!,@,#,$,%,^,*,+,=,- )??? ????????? ??????????????? ??????????????????
						</div>
					}
					{passwordErrorInId &&
						<div className='errorMsg'>
							??????????????? ???????????? ????????? ??? ????????????.
						</div>
					}

					<label>???????????? ??????</label>
					{errorUserPassword2 === false && password2Updated2 &&
						<span className='succes_check'>
							<img  src={`${process.env.PUBLIC_URL}/img/checked.png`}/>
						</span>
					}
					<input name="password2" id="pass" className="field_class" type="password" placeholder="??????????????? ???????????????" onChange={onChangepassword2} value={password2} />
					{errorUserPassword2 &&
						<div className='errorMsg'>
							??????????????? ????????????.
						</div>
					}
					
					<div className="sign_welcome" hidden={ password2Updated2   && nameLength && emailLength && passwordLength && erroruserNickname === false && errorUserEmail === false && errorUserPassword2 === false && errorUserPassword === false ? false : true} >????????? ???????????? : )</div>
					<button className="submit_class" onClick={Sign_up_button} disabled={ password2Updated2  && nameLength && emailLength && passwordLength && erroruserNickname === false && errorUserEmail === false && errorUserPassword2 === false && errorUserPassword === false ? false : true} >????????????</button>
				</div>
				<div className="info_div">
					<p>????????????????????? <a href="/login">?????????</a></p>
				</div>
			</form>
		</main>
	);
}

export default Sign_up;