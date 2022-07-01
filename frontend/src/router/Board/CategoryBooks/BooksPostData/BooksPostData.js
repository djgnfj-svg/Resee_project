import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function BooksPostData() {

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
            navigate("/board");
        })
    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/post/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostList(res.data)
            setPostList2(true)
            setPostIds(res.data.ids)
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div className='Review_page'>
            <div className='Review_title'>
                {postList && postList2 === true &&
                 <>
                    <input readOnly value={postList[count].title} onChange={handleChangeInput} />
                </>
                }
            </div>
            <div className='Review_content'>
                {postList && postList2 === true &&
                 <>
                    <textarea readOnly value={postList[count].description} onChange={handleChangeInput2} />
                </>
                }
            </div>
            <div className='Review_addBtn'>
                <div style={{ display: "flex", flexDirection: "row", width: "200px", position: "relative" }}>
                    <div className='te'>
                        <button disabled={count + 1 === 1 ? true : false} onClick={() => setCount(count - 1)}>이전</button>
                    </div>
                    <span style={{ color: "white", marginTop: "2px" }}>{count + 1 + " / " + (Object.keys(postList).length - 1)}</span>
                    <div className='te' style={{}}>
                        <button disabled={count + 1 === (Object.keys(postList).length - 1) ? true : false} onClick={() => setCount(count + 1)}>다음</button>
                    </div>
                </div>
                <button className='finish_btn' hidden={count + 1 === (Object.keys(postList).length - 1) ? false : true} onClick={(e) => handleFinishBtn(e)}>나가기</button>
            </div>
        </div>
    )
}

export default BooksPostData