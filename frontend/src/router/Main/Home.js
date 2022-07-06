import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css' 
import isLogin from '../../components/isLogin';

function Home() {   

    useEffect(() => {
        getAccessToken();
    }, [])
    

    const navigate = useNavigate("");



        // 홈페이지
        //access_token 만료시 refresh토큰 사용해 access token 재발급
        //access_toekn 만료됐다

    const getAccessToken = () => {
        axios.get("http://127.0.0.1:8000/api/Books/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .catch(error => {
                axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
                    {
                        refresh:localStorage.getItem('refresh_token')
                    }
                ).then(res => {
                    localStorage.setItem('access_token', "lostark")
                    localStorage.setItem('access_token',res.data.access)
                })
            })
    }

    const goSignUp = () => {
        if(!isLogin === true){
        navigate('/sign_up')
        }else{
            alert(" 이미 로그인 중이에요 !")
    }
}

    return (
        <div className="hero-image">
            <div className="hero-text" style={{color:"white"}}>
                <h1>뭔가 머리에 안남는다면</h1>
                <p>일단 다시봐보는건 어떨까?</p>
                <button className='hero-button' ><a onClick={() => goSignUp()} style={{ textDecoration: 'none', color: "white" }}>회원가입</a></button>
            </div>
        </div>
    )
}

export default Home