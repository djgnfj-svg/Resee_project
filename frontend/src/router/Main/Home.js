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
            <div className="hero-text" style={{color:"black" , top:"21%",position:"relative"}}>
                <h1>Write & ReSee</h1>
                <h3 style={{fontSize:"20px"}}>Wan't you Remember?</h3>
                <h3 style={{fontSize:"20px"}}>Write and See again With ReSee</h3>
                <button className='hero-button' ><a onClick={() => goSignUp()} style={{ textDecoration: 'none', color: "white" }}>회원가입</a></button>
            </div>
            <div className='hero-Go_velog'>
                <div className='velog_content'>
                    <div className='velog_img'></div>
                    <div>여긴 글자에용</div>
                    <button>Ok</button>
                </div>
                <div className='velog_content'>
                    <div className='velog_img'></div>
                    <div>여긴 글자에용</div>
                    <button>Ok</button>
                </div>
                <div className='velog_content'>
                    <div className='velog_img'></div>
                    <div>여긴 글자에용</div>
                    <button>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default Home