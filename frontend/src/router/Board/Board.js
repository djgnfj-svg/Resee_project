import axios from 'axios';
import React, { useState,useEffect } from 'react'
import './Board.css'
import Add_modal from './Section/js/Add_modal'
import { useNavigate }  from 'react-router-dom'

function Board() {

    const navigate = useNavigate("");
    
    const [showModal , setShowModal] = useState(false);
    const [booksData , setBooksData] = useState([]);
    const modalClose = () => {
        setShowModal(!showModal)
    }
    
    useEffect(() => {
      getBooksData();
    }, [showModal === false])

    const getBooksData = () => {
        axios.get("http://127.0.0.1:8000/api/Books/",
        {
            headers:{
                Authorization : `Token ${localStorage.getItem('token')}`
            } 
        })
        .then(res => {
            setBooksData(res.data);
        })
    }

  return (
      <div className={booksData.length === 2 && 'board_contain_two' || booksData.length === 1 && 'board_contain_one' || 'board_contain'} >
        <div className={booksData.length === 2 && 'wrapper_board_two' || booksData.length === 1 && 'wrapper_board_one' || 'wrapper_board'}>
        { booksData.length > 0 ? booksData.map((item , index) => (
            <>
                    <div className="board">
                        <div className="books_img">
                            <img className="test_a" src={`${process.env.PUBLIC_URL}/img/books.png`} onClick={() => navigate("/board/CategoryBooks/"+index)} />
                            <img className="test_b" src={`${process.env.PUBLIC_URL}/img/revels.png`} onClick={() => navigate("/board/CategoryBooks/"+index)} />
                        </div> 
                        <div className="books">
                            <div className='books_title' onClick={() => navigate("/board/CategoryBooks/"+index)}>{item.title}</div>
                            <div className='books_content'>{item.rough_description}</div>
                            <div className='books_btn'>
                                <button className='write_books' onClick={() => navigate("/board/CategoryBooks/"+index+"/test")}>작성</button>
                                <button className='ReSee_books'>복습</button>
                            </div>
                        </div>
                    </div>
            </>
    ))
            :
            <>
                <div className='No_data'>
                <img src={`${process.env.PUBLIC_URL}/img/No_Data.png`} />
                <div>음? 데이터가 없어요 추가해주실래요?</div>
                <button onClick={modalClose}>추가하기</button>
                </div>
            </>
}
    </div>
            <div className={booksData.length === 2 && 'write_btn_two' || booksData.length === 1 && 'write_btn_one' || booksData.length === undefined && "hide" || 'write_btn'}>
                {console.log(booksData.length)}
                <button onClick={modalClose}>추가하기</button>
                { showModal && <Add_modal  show={modalClose} /> }
            </div>
    </div>
  )
}

export default Board