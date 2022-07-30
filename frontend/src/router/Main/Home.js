import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import isLogin from '../../components/isLogin';
import './Home.css' 

function Home() {   
    
    const navigate = useNavigate("");

    useEffect(() => {
        if (!!isLogin()) {
            axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/", //리프레시 토큰 유효 검사
                {
                    refresh: localStorage.getItem('refresh_token')
                }).then(res => {
                    localStorage.setItem('access_token', res.data.access)
                }).catch(error => {
                    //리프레시가 없거나 만료상태 시 로그인 잔행
                    localStorage.clear();
                    alert("정상 로그인 후 진행해주세요 ^^")
                    navigate('/')
                })
            }
    }, [])

    return (
        <div className="hero-image">
            <div className="hero-text" style={{color:"black" , top:"21%",position:"relative"}}>
                <h1>Write & ReSee</h1>
                <h3 style={{fontSize:"20px"}}>Wan't you Remember?</h3>
                <h3 style={{fontSize:"20px"}}>Write and See again With ReSee</h3>
                {!isLogin ? (
                    <>
                    <button className='hero-button' ><a style={{ textDecoration: 'none', color: "white" }}>가입하기</a></button>
                    </>
                ) 
                :
                (
                    <>
                    <button className='hero-button_user' onClick={() => navigate("/board")} ><a style={{ textDecoration: 'none', color: "white" }}>Go !</a></button>
                    </>
                )
                
                }
            </div>
            {/* <div className='hero-Go_velog'>
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
            </div> */}
        </div>
    )
}

export default Home