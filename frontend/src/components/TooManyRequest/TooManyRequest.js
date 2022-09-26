import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TooManyRequest.css'

function TooManyRequest() {
    const navigate = useNavigate()

    useEffect(() => {
        const timeid = setTimeout(() => {
            alert("호에에에에에에에엥")
            navigate(-1)
        }, 58000)
        return () => clearTimeout(timeid)
    }, [])

    return (
        <div className='Request_Toomany'>
            <h2>요청이 너무 많아요 <br /> 조금만 기다려주세요 : )</h2>
            <img src={`${process.env.PUBLIC_URL}/img/TooManyImg.gif`} />
        </div>
    )
}

export default TooManyRequest
