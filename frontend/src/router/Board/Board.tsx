import * as React from 'react';
import { useState, useEffect } from 'react'
import './Board.css'
import Add_modal from './Section/js/Add_modal'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import  { BooksListUrl, CategoryDelete, CategoryListUrl, ReviewBooks } from '../../components/ApiUrl';
import isLogin from '../../components/isLogin';

function Board() {

    type Books = {
        id : number;
        title : string;
        rough_description : string;
    }

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [booksData, setBooksData] = useState([]);
    const [delBoolean , setDelBoolean] = useState(false)

    const modalClose = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        if(booksData){
            getBooksData();
        }else if(booksData === ""){
            getBooksData();
        }else{
            alert("당신 어떻게 들어왔어 !!")
        }
    }, [showModal === false || delBoolean === true])

    const getBooksData = () => {
            axios.get(CategoryListUrl,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                if(res.data.msg === "books가 없습니다."){
                    setBooksData(res.data);
                }else{
                    setBooksData(res.data);
                }
            }).catch(error => {
                if(error.response.status === 403) {
                    alert("로그인 후 이용해주세요")
                    navigate('/login')
                }else if(error.response.status === 404){
                    
                }else{
                    alert("요청이 너무많습니다.")
                }
            })  
        }
    
    const AddPostBook = (id:number) => {
        navigate(`/board/categorybooks/${id}/write/`)
    }

    const GoCategoryBooks = (id:number) => {
        axios.get(BooksListUrl(id),
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                navigate(`/board/categorybooks/${id}`)
            }).catch(error => {
                if(error.response.status === 404){
                    alert("우선 책 하나 작성을 해볼까요 ?")
                }else{
                    alert("예상 치 못한 오류 ")
                }
            })
    }

    const handleRemoveBooks = (title:string,id:number) => {
        let removeBooks = prompt("삭제하실 책의 이름을 입력해주세요","")
        if(removeBooks === title){
            axios.delete(CategoryDelete(id) ,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                },
                ).then(res => {
                    navigate("/board");
                    getBooksData();
                }).catch(error => {
                    console.log(error)
                })
        }else if(removeBooks === null){
            //취소 클릭 시 아무행동 없음
        }else if(removeBooks !== title){
            alert("올바른 책 이름이 아니에요!")
        }
    }

    const getBooksReviewData = (id:number) => {
        axios.get(ReviewBooks(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            if(Object.keys(res.data).length === 1){
                alert("복습을 다 하셨거나 안에 내용이 없어요 !")
            }else {
                navigate(`/board/categorybooks/${id}/review`)
            }
        }).catch(error => {
            alert("복습할 책이 없어요 !")
        })
    }

    return (
            <div className={booksData && booksData.length === 2 && 'board_contain_two' || booksData.length === 1 && 'board_contain_one' || 'board_contain'} >
                <div className={booksData && booksData.length === 2 && 'wrapper_board_two' || booksData.length === 1 && 'wrapper_board_one' || 'wrapper_board'}>
                    {booksData && booksData.length ? booksData.map((item:Books, index) => (
                        <>
                            <div className="board">
                                <div className="books_img">
                                    <img className="test_a" src={`${process.env.PUBLIC_URL}/img/books.png`} onClick={() => GoCategoryBooks(item.id)} />
                                    <img className="test_b" src={`${process.env.PUBLIC_URL}/img/revels.png`} onClick={() => GoCategoryBooks(item.id)} />
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
                {booksData.length >= 4 ? 
                <>
                    <div className={booksData.length === 2 && 'write_btn_two' || booksData.length === 1 && 'write_btn_one'|| 'write_btn'}>
                    <div className='error_maxLength'>책은 최대 4개 까지만 생성 가능합니다.</div>
                    <div style={{color:"#c7c7c7" , fontSize:"14px" , marginBottom:"10px" }}>추가 생성을 원한다면 ? <a href='#' style={{marginLeft:"5px" , color:"white" ,fontSize:"14.5px" ,  textDecoration:"underline" ,}}>Go Premium</a></div>
                        <button onClick={modalClose} disabled = {true} >추가하기</button>
                        {showModal && <Add_modal show={modalClose} />}
                    </div>
                </>
                :
                    <div className={booksData.length === 2 && 'write_btn_two' || booksData.length === 1 && 'write_btn_one'|| 'write_btn'}>
                        <button onClick={modalClose}>추가하기</button>
                        {showModal && <Add_modal show={modalClose} />}
                    </div>
            }
            </div>
    )
}

export default Board