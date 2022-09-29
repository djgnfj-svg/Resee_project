import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NonePage() {

  const navigate = useNavigate()

  useEffect(() => {
    alert("비정상 접근입니다.")
    navigate("/")
  },[])

  return (
    <div>
      
    </div>
  )
}

export default NonePage
