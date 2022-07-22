import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css' 
import isLogin from '../../components/isLogin';

function Home() {   
    
    const navigate = useNavigate("");

    return (
        <div className="hero-image">
            <div className="hero-text" style={{color:"black" , top:"21%",position:"relative"}}>
                <h1>Write & ReSee</h1>
                <h3 style={{fontSize:"20px"}}>Wan't you Remember?</h3>
                <h3 style={{fontSize:"20px"}}>Write and See again With ReSee</h3>
                <button className='hero-button' ><a style={{ textDecoration: 'none', color: "white" }}>가입하기</a></button>
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