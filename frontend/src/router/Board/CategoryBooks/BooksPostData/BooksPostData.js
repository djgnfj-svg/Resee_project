import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './BooksPostData.css'


function BooksPostData() {

    const { id } = useParams("");
    const { postId } = useParams("");

    const [postList, setPostList] = useState([]);

    const [navigateData, setNavigateData] = useState("")
    const [navigateId , setNavigateId] = useState("");

    const [test, setTest] = useState(false)


    const navigate = useNavigate("");

    const handleChangeInput = (e) => { }
    const handleChangeInput2 = (e) => { }


    useEffect(() => {
        getBooksReviewData();
        getBooksData();
    }, [postId])
   
    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
                {
                    refresh:localStorage.getItem('refresh_token')
                }
            ).then(res => {
                localStorage.setItem('access_token', "lostark")
                localStorage.setItem('access_token',res.data.access)
                getBooksReviewData();
                getBooksData();
            })
    }

    const getBooksData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/post/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            console.log(res.data[0].id)
            if (res.data.msg === "Post가 없습니다.") {

            } else {
                setNavigateData(res.data)
                setNavigateId(res.data[0].id);
            }
        }).catch(error => {
            getAccessToken()
            console.log("hellow");
        })
    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/post/${postId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostList(res.data)
            console.log("aaa")
        }).catch(error => {
            getAccessToken()
        })
    }

    const goBooksData = (itemId) => {
        navigate(`/board/CategoryBooks/${id}/postReview/${itemId}`);
    }

    const handleRemoveBtn = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            axios.delete(`http://127.0.0.1:8000/api/Books/${id}/post/${postId}/`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                if(navigateData === null){
                    navigate(`/board/CategoryBooks/${id}`)
                }else{
                    navigate(`/board/CategoryBooks/${id}/postReview/${navigateId}`);
                    getBooksData();
                }
            })
        }
    }


    return (
        <div className='Review_page'>
            <div className='Review_title'>
                {postList && <>
                    <ReactMarkdown className='markdown_title' children={postList.title} />
                </>
                }
            </div>
            <div className='Review_content'>
                {postList && <>
                    <ReactMarkdown className='markdown_content' children={postList.description} />
                </>}
            </div>

            <div>
                <div style={{position:"absolute" ,top:"-50px"}}>
                <div className={test === true ? "CloseBtn" : "Navigations_var"}  >
                    {/* <div >
                            <img style={{width:"30px" , backgroundColor:"rgb(78,78,78)"}} src={`${process.env.PUBLIC_URL}/img/Menu.png`} onClick={() => handleClickNavigate()} />
                        </div> */}
                    {navigateData && navigateData.map((item, index) => (
                        <>
                            <div className={item.id === postList.id ? "selected" : "unSelected"} onClick={() => goBooksData(item.id)}><a ><img src={`${process.env.PUBLIC_URL}/img/Note.png`} />    {item.title}</a></div>
                        </>
                    ))}
                    {navigateData && navigateData === null && (
                        <>
                        </>
                    )}
                </div>
                    <div className='remove_Btn' >
                        <button style={{ marginRight: "10px" }} onClick={() => navigate(`/board/CategoryBooks/${id}/changeReview/${postId}`)}>수정하기</button>
                        <button style={{ backgroundColor: "#e62e3d", color: "white" }} onClick={() => handleRemoveBtn()}>삭제하기</button>
                    </div>
                    <div className='prev_btn'>
                        <img /><button onClick={() => navigate(`/board/CategoryBooks/${id}`)}>이전 페이지</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksPostData