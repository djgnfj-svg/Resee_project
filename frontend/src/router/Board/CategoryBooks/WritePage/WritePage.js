import axios from 'axios'
import React from 'react'
import './WritePage.css'

function WritePage() {

    const handleSubmitPost = () => {
        
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