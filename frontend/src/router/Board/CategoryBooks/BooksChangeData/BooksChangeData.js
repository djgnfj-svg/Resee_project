import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import {useNavigate, useParams} from 'react-router-dom'
import InputComponent from '../../../../components/InputComponent'
import ReactMarkdown from 'react-markdown'

function BooksChangeData() {

    const {id} = useParams();
    const {postId} = useParams();

    const navigate = useNavigate("");
    const textRef = React.createRef();
    
    const [title,setTitle] = useState("")
    const [testing , setTesting] = useState([[{text : ""}]])
    const [description, setDescription] = useState("")
    const [postList , setPostList] = useState("");



    const handleChangeInput = (e) => {setTitle(e.target.value)}

    const handleChangeInput2 = (e) => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        getBooksReviewData()
    },[])


    const handleResizeInput = () => {
        const obj = textRef.current
        obj.style.height = "auto";
        obj.style.height = obj.scrollHeight + 'px';
    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/Books/${id}/post/${postId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setPostList(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }).catch(error => {
            console.log(error);
        })
    }

    const handleSubmitPost = () => {
        axios.put(`http://127.0.0.1:8000/api/Books/${id}/post/${postId}/`,{
            title : title,
            description : description,
        },
        {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('access_token')}`
            }   
        })
        .then( res =>{
            navigate(`/board/CategoryBooks/${id}`);
        }
        )
    }


  return (
    <div>
        <div style={{marginTop:"30px"}}>
            <input className='Write_title' maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
        </div>
    <div className='Write_page'>
        <div className='Write_content' id='Write'>
            <div className='testing'>
                <textarea autoFocus  ref={textRef} onKeyDown={handleResizeInput} onKeyUp={handleResizeInput} value={description} onChange={handleChangeInput2}  placeholder="내용을 입력해주세요" />
            </div>
        </div>
            <ReactMarkdown children={description} className="markdown" placeholder="입력해주세요" >
            </ReactMarkdown>
    </div>
        <div className='Write_addBtn'>
            <button onClick={(e) => handleSubmitPost(e)}>수정 완료</button> 
        </div>
    </div>
  )
}

export default BooksChangeData