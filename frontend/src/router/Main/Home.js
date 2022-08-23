import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import isLogin from '../../components/isLogin';
import WrapperFrirst from './Section/WrapperFirst';

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
        <>
            <WrapperFrirst isLogin = {isLogin} />
    </>
    )
}

export default Home