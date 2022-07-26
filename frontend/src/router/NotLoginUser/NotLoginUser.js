import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotLoginUser() {

    const navigate = useNavigate();

    useEffect(()=> {
        GoLogin()
    },[])

    const GoLogin = () => {
        alert("로그인 후 이용해주세요")
        navigate("/login")
    }

  return (
    <div>
      
    </div>
  )
}

export default NotLoginUser
