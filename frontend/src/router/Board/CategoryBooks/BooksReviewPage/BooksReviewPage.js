import React, { useState, useEffect } from 'react'
import './BooksReviewPage.css'
import axios from 'axios'
import './BooksReviewPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'


function BooksReviewPage() {

    const { id } = useParams("");

    const [count, setCount] = useState(0);
    const [postList, setPostList] = useState([]);
    const [postList2, setPostList2] = useState(false);
    const [postIds ,setPostIds] = useState("");

    const navigate = useNavigate("");

    const handleChangeInput = (e) => { }
    const handleChangeInput2 = (e) => { }

    useEffect(() => {
        getBooksReviewData();

    }, [setPostList2])

    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
                {
                    refresh:localStorage.getItem('refresh_token')
                }
            ).then(res => {
                localStorage.setItem('access_token', "lostark")
                localStorage.setItem('access_token',res.data.access)
                getBooksReviewData()
            })
    }

    const handleFinishBtn = (e) => {
        axios.post(`http://127.0.0.1:8000/api/Books/${id}/review/`,
        {
            ids : postIds
        },
        {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('access_token')}`
            } 
        })
        .then(res => {
            navigate("/board")
        })
    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/review/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostList(res.data)
            setPostIds(res.data.ids)
            setPostList2(true);
        }).catch(error => {
            getAccessToken()
        })
    }


    return (
        <div className='Review_page'>
            <div className='Review_title'>
                {postList && postList2 === true && <>
                    <ReactMarkdown className='markdown_title' children={postList[count].title} />
                </>
                }
            </div>
            <div className='Review_content'>
                {postList && postList2 === true && <>
                    <ReactMarkdown className='markdown_content' children={postList[count].description}  />
                </>}
            </div>
            <div className='Review_addBtn'>
                <div style={{ display: "flex", flexDirection: "row", width: "220px", position: "relative" }}>
                    <div className='te'>
                        <button hidden={count + 1 === 1 ? true : false} onClick={() => setCount(count - 1)}>이전</button>
                        <div hidden={count + 1 === 1 ? false : true}></div>
                    </div>
                    {/*count / postList.length */}
                    <span style={{ color: "white", marginTop: "2px" }}>{count + 1 + " / " + (Object.keys(postList).length - 1)}</span>
                    <div className='te' style={{}}>
                        {/* count === poistlish.length ? 다음 버튼 비활성화 : 다음버튼 활성화 */}
                        <button hidden={count + 1 === (Object.keys(postList).length - 1) ? true : false} onClick={() => setCount(count + 1)}>다음</button>
                    </div>
                </div>
                <button className='finish_btn' hidden={count + 1 === (Object.keys(postList).length - 1) ? false : true} onClick={(e) => handleFinishBtn(e)}>완료</button>
            </div>
        </div>
    )
}

export default BooksReviewPage