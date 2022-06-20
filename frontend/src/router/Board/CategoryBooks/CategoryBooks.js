import React from 'react'
import './CategoryBooks.css'
import {useNavigate} from 'react-router-dom'

function CategoryBooks() {

  const navigate = useNavigate("");

  return (
    <>
    <div style={{margin:"0 auto" , display:"inline-block"}}>
        <div className='books'>
        <img src={`${process.env.PUBLIC_URL}/img/revels.png`} />
          </div>
          <div className='add_category'>
            <button onClick={() => navigate("/board/CategoryBooks/"+"0"+"/test")}>추가하기</button>
            </div>
    </div>
    </>
  )
}

export default CategoryBooks