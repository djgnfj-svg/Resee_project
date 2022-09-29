import React from 'react'
import { useNavigate } from 'react-router-dom'
import './WrapperFirst.css'

function WrapperFrirst({ isLogin }:{isLogin:boolean}) {
    const navigate = useNavigate()

    return (
        <div className='hero-image'>
            <div className='hero-first'>
                <div className='hero-first-img'>
                    <div><img src={`${process.env.PUBLIC_URL}/img/Hero_Char.png`} alt="img" /></div>
                </div>
                <div className="hero-first-text" style={{ color: "black", position: "relative" }}>
                    <h1>Write & See</h1>
                    <h3>Wan't you Remember?</h3>
                    <h3>Write and See again With ReSee</h3>
                    {!isLogin ? (
                        <div>
                            <button className='hero-button' onClick={() => navigate("/sign_up")} >가입하기</button>
                        </div>
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
