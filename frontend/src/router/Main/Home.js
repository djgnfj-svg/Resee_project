import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate("");

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