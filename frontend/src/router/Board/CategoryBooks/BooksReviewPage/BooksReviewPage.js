import React, { useState, useEffect } from 'react'
import './BooksReviewPage.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { ReviewBooks } from '../../../../components/ApiUrl'


function BooksReviewPage() {

    const { id } = useParams("");

    const [count, setCount] = useState(0);
    const [postList, setPostList] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postIds ,setPostIds] = useState("");

    const navigate = useNavigate("");

    
    useEffect(() => {
        getBooksReviewData();
        //eslint-disable-next-line
    },[count])

    const handleFinishBtn = (e) => {
        axios.post(ReviewBooks(id),
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
        axios.get(ReviewBooks(id), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostDescription(res.data[count].description.replaceAll("\n", "\n\n"))
            setPostList(res.data)
            setPostIds(res.data.ids)
        }).catch(error => {
           console.log(error)
        })
    }


    return (
        <div className='Review_page'>
            <div className='Review_title'>
                {postList && <>
                    <ReactMarkdown className='markdown_title' children={postList[count].title} />
                </>
                }
            </div>
            <div className='Review_Content'>
                {postList && <>
                    <ReactMarkdown  children={postDescription} />

                </>}
            </div>
            <div className='Review_addBtn'>
                <div style={{ display: "flex", flexDirection: "row", width: "258px", position: "relative" }}>
                        <button className='finish_btn' hidden={count + 1 === (Object.keys(postList).length - 1) ? false : true} onClick={(e) => handleFinishBtn(e)}>다 봤어요 !</button>
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
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksReviewPage