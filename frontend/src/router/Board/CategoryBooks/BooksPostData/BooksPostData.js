import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './BooksPostData.css'
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';


function BooksPostData() {

    const { id } = useParams("");
    const { postId } = useParams("");

    const [postList, setPostList] = useState("");

    const [navigateData, setNavigateData] = useState("")
    const [navigateId , setNavigateId] = useState("");

    const [test, setTest] = useState(false)

    const navigate = useNavigate("");

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
        axios.get(`http://127.0.0.1:8000/api/books/${id}/post/`, {
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
        })
    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}/post/${postId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostList(res.data)
        }).catch(error => {
            getAccessToken()
        })
    }

    const goBooksData = (itemId) => {
        navigate(`/board/categorybooks/${id}/postreview/${itemId}`);
    }

    const handleRemoveBtn = (e) => {
        if (window.confirm("정말 삭제하시겠습니까?") === true) {
            axios.delete(`http://127.0.0.1:8000/api/books/${id}/post/${postId}/`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                if(navigateData === null){
                    navigate(`/board/categorybooks/${id}`)
                }else{
                    navigate(`/board/categorybooks/${id}/postreview/${navigateId}`);
                    getBooksData();
                }
            })
        }
        // 포스트 삭제 시 관련 이미지룰 db에서 지워줘야 한다
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
                {postList &&
                <> 
                {console.log(postList.description)}
                    <Viewer 
                        initialValue={postList.description}
                    />
                </>
                }
            </div>
                    
            <div>
                <div style={{position:"absolute" ,top:"-50px"}}>
                <div className={test === true ? "CloseBtn" : "Navigations_var"}  >
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