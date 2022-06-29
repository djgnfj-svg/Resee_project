import axios from 'axios'
import React, { useState } from 'react'
import './WritePage.css'
import {useNavigate, useParams} from 'react-router-dom'

function WritePage() {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const {id} = useParams();

    const navigate = useNavigate("");

    const handleChangeInput = (e) => {setTitle(e.target.value)}
    const handleChangeInput2 = (e) => {
        setDescription(e.target.value)
    }

    const handleKeyup = (e) =>{
        setTitle(e.target.value.split("##",1))
        
    }

    const handleSubmitPost = () => {
        axios.post(`http://127.0.0.1:8000/api/Books/${id}/post/`,{
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


    // 문자열.replace(정규식, 대체문자)
  return (
    <div className='Write_page'>
        <div className='Write_content'>
            <input placeholder='제목을 입력해주세요' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={description} onChange={handleChangeInput2} placeholder="내용을 입력해주세요" />
        </div>
        <div className='Write_addBtn'>
            <button onClick={() => handleSubmitPost()}>추가하기</button>
        </div>
    </div>
  )
}

export default WritePage