import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../Section/WrapperFirst.css'

function WrapperFrirst({ isLogin }) {

    const navigate = useNavigate("")

    return (
        <div className='hero-image'>
            <div className='hero-first'>
                <div className='hero-first-img'>
                    <div><img /></div>
                </div>
                <div className="hero-first-text" style={{ color: "black", position: "relative" }}>
                    <h1>Write & ReSee</h1>
                    <h3 style={{ fontSize: "20px" }}>Wan't you Remember?</h3>
                    <h3 style={{ fontSize: "20px" }}>Write and See again With ReSee</h3>
                    {!isLogin ? (
                        <>
                            <button className='hero-button' ><a style={{ textDecoration: 'none', color: "white" }}>가입하기</a></button>
                        </>
                    )
                        :
                        (
                            <>
                                <button className='hero-button_user' onClick={() => navigate("/board")} >Go !</button>
                            </>
                        )

                    }
                </div>

            </div>
        </div>
    )
}

export default WrapperFrirst
