import axios from 'axios'
import React from 'react'
import './WritePage.css'
import {useNavigate} from 'react-router-dom'

function WritePage() {

    const navigate = useNavigate("");

    const handleSubmitPost = () => {
        navigate("/board/CategoryBooks/0")
    }

  return (
    <div className='Write_page'>
        <div className='Write_title'>
            <input />
        </div>
        <div className='Write_content'>
            <textarea />
        </div>
        <div className='Write_addBtn'>
            <button onClick={handleSubmitPost}>추가하기</button>
        </div>
    </div>
  )
}

export default WritePage