import React,{ useState, useEffect } from 'react'
import './BooksReviewPage.css'
import axios from 'axios'
import './BooksReviewPage.css'
import {useNavigate, useParams} from 'react-router-dom'

function BooksReviewPage() {

    const {id} = useParams("");
    
    const [count,setCount] = useState(0);
    const [postList , setPostList] = useState([]);
    const [postList2 , setPostList2] = useState(false);
    
    const {index} = useParams();
    const navigate = useNavigate("");

    const handleChangeInput = (e) => {}
    const handleChangeInput2 = (e) => {}

    useEffect(() => {
        getBooksReviewData();
    
    }, [setPostList2])
    

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/review/`,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('access_token')}`
            }   
        }).then(res => {
            setPostList(res.data)
            setPostList2(true)
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='Review_page'>
            <div className='Review_title'>
            {postList2 === true && <>
                <input readOnly value={postList[count].title} onChange={handleChangeInput} />
                </>
            }     
            </div>
            <div className='Review_content'>
                {postList2 === true && <>
                <textarea  readOnly value={postList[count].description} onChange={handleChangeInput2} />
                </>}
            </div>
            <div className='Review_addBtn'>
                <div style={{display:"flex" , flexDirection : "row" , width:"200px" , position:"relative"}}>
                    <div className='te' style={{ }}>
                        <button disabled={count + 1 === 1 ? true : false} onClick={() => setCount(count - 1)}>이전</button>
                    </div>
                        {/*count / postList.length */}
                    <span style={{color:"white" , marginTop:"2px"}}>{count + 1 +" / " + postList.length}</span>
                    <div className='te' style={{}}>
                        {/* count === poistlish.length ? 다음 버튼 비활성화 : 다음버튼 활성화 */}
                        <button disabled={count + 1 === postList.length  ? true : false} onClick={() => setCount(count + 1)}>다음</button>
                    </div>
            </div>
                    <button className='finish_btn' hidden={count + 1 === postList.length  ? false : true} onClick={() => navigate("/board")}>완료</button>
            </div>
        </div>
      )
}

export default BooksReviewPage