import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {   

    useEffect(() => {
        getAccessToken();
    }, [])
    

    // const getAccessToken = () => {
    //     if(localStorage.getItem('access_token') === null && localStorage.getItem('refresh_token') !== null){
    //         axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/" ,localStorage.getItem('refresh_token')
    //         .then(res => {
    //             localStorage.setItem('access_token',res.data.access)
    //         }))
    //     }
    // 
    const navigate = useNavigate("");



        // 홈페이지
        // refresh 있으면 axios post access_token 을 요청
        // refesh토큰이 만료가 안됐다면 그거값 보내
        // 성공시 (
            // 온 access토큰으로 로그인
            // 실패시(
                //localstorage.clear()}

    const getAccessToken = () => {
        if(localStorage.getItem("refresh_token") !== null){
             axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",{
                'refresh' : localStorage.getItem("refresh_token")
            })
            .then(res => {
                localStorage.setItem('access_token' , res.data.access)
            })
            .catch(error => {
                console.log(error)
            })
        }else{
            localStorage.clear();
        }
    }

    return (
        <div className="hero-image">
            <div className="hero-text">
                <h1>뭔가 머리에 안남는다면</h1>
                <p>일단 다시봐보는건 어떨까?</p>
                <button className='hero-button' ><a onClick={() => navigate('/sign_up')} style={{ textDecoration: 'none', color: "white" }}>회원가입</a></button>
            </div>
        </div>
    )
}

export default Home