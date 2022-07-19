import React, { useState, useEffect } from 'react'
import './Board.css'
import Add_modal from './Section/js/Add_modal'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import isLogin from '../../components/isLogin';

function Board() {

    const navigate = useNavigate("");

    const [showModal, setShowModal] = useState(false);
    const [booksData, setBooksData] = useState("");
    const [delBoolean , setDelBoolean] = useState(false)

    const modalClose = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        notLogin();
    },[])

    useEffect(() => {
        getBooksData();
    }, [showModal === false] || delBoolean === true)

    const notLogin = () =>{
        if(!isLogin() || localStorage.getItem('access_token') === null){
            navigate("/login");
            alert("로그인 후 이용해주세요 ! ");
        }
    }

    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
                {
                    refresh:localStorage.getItem('refresh_token')
                }
            ).then(res => {
                localStorage.setItem('access_token',res.data.access)
                getBooksData();
            })
    }


    const getBooksData = () => {
        axios.get("http://127.0.0.1:8000/api/books/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                if(res.data.msg === "books가 없습니다."){
        
                }else{
                    setBooksData(res.data);
                }
            }).catch(error => {
                getAccessToken()
            })  
    }

    const AddPostBook = (id) => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}/post/`,
        {
        headers:{
        Authorization : `Bearer ${localStorage.getItem('access_token')}`
        }
        })
        .then(res =>{
            if(res.data.length <= 12){
               alert("12개 까지만 만들 수 있어요 ! 프리미엄 고?")
               navigate(`/board/categorybooks/${id}/write/`)
            }
        }) 
    }

    

    const handleRemoveBooks = (title,id) => {
        let removeBooks = prompt("삭제하실 책의 이름을 입력해주세요","")
        console.log(id)
        if(removeBooks === title){
            axios.delete(`http://127.0.0.1:8000/api/books/${id}/` ,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                },
                )
                .then(res => {
                    navigate("/board");
                    getBooksData();
                }).catch(error => {
                    console.log(error)
                })
        }else if(removeBooks === null){
            //취소 클릭 시 아무행동 없음
        }else if(removeBooks !== title){
            alert("올바른 책 이름이 아닌거같아요 !")
        }
    }

    const getBooksReviewData = (id) => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}/review/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            console.log(Object.keys(res.data).length)
            if(Object.keys(res.data).length === 1){
                alert("복습을 다 하셨거나 안에 내용이 없어요 !")
            }else {
                navigate(`/board/categorybooks/${id}/review`)
            }
        }).catch(error => {
            getAccessToken()
            alert("복습할 책이 없어요 !")
        })
    }

    return (
            <div className={booksData.length === 2 && 'board_contain_two' || booksData.length === 1 && 'board_contain_one' || 'board_contain'} >
                <div className={booksData.length === 2 && 'wrapper_board_two' || booksData.length === 1 && 'wrapper_board_one' || 'wrapper_board'}>
                    
                    {booksData && booksData.length !== 0 ? booksData.map((item, index) => (
                        <>
                            <div className="board">
                                <div className="books_img">
                                    <img className="test_a" src={`${process.env.PUBLIC_URL}/img/books.png`} onClick={() => navigate(`/board/categorybooks/${item.id}`)} />
                                    <img className="test_b" src={`${process.env.PUBLIC_URL}/img/revels.png`} onClick={() => navigate(`/board/categorybooks/${item.id}`)} />
                                </div>
                                <div className="books">
                                    <div className='books_title' onClick={() => navigate(`/board/categorybooks/${item.id}`)}> {item.title}</div>
                                    <div className='books_content'>{item.rough_description}</div>
                                    <div className='books_btn'>
                                        <button className='write_books' onClick={() => AddPostBook(item.id)}>작성</button>
                                        <button className='ReSee_books' onClick={() => getBooksReviewData(item.id)}>복습</button>
                                        <button className='Remove_books' onClick={() => handleRemoveBooks(item.title,item.id)}>삭제하기</button>
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
                            </div>
                        </>
                    }
                </div>
                <div className={booksData.length === 2 && 'write_btn_two' || booksData.length === 1 && 'write_btn_one' || ((booksData.length === 0 || booksData.length) === undefined && "hide") || 'write_btn'}>
                    <button onClick={modalClose}>추가하기</button>
                    {showModal && <Add_modal show={modalClose} />}
                </div>
            </div>
    )
}

export default Board