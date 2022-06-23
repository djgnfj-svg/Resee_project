import React from 'react'
import './CategoryBooks.css'
import {useNavigate} from 'react-router-dom'

function CategoryBooks() {

  const navigate = useNavigate("");

  return (
    <>
    <div style={{margin:"0 auto" , display:"inline-block"}}>
        <div className='category'>
        <img src={`${process.env.PUBLIC_URL}/img/revels.png`} />
        <div className='wrapper_category'>
          <div className='category_List'>
            <div className='books_title'><a href='#'>1. React BootStrap</a><button className='edit_btn'>수정</button></div>
            <div className='books_title'>06-23. Props Request</div>
            <div className='books_title'>3. JavaScript</div>
            <div className='books_title'>4. Python Feed</div>
            <div className='books_title'>5. Algorithm</div>
            <div className='books_title'>6. Test Commit</div>
            <div className='books_title'>7. Test Commit</div>
            <div className='books_title'>7. Test Commit</div>
          </div>
        </div>
          </div>
          <div className='add_category'>
            <button onClick={() => navigate("/board/CategoryBooks/"+"0"+"/test")}>추가하기</button>
            </div>
    </div>
    </>
  )
}

export default CategoryBooks