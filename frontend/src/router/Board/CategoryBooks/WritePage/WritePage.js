import axios from 'axios'
import React, { useState } from 'react'
import './WritePage.css'
import {useNavigate, useParams} from 'react-router-dom'

function WritePage() {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const {index} = useParams();

    const navigate = useNavigate("");

    const handleChangeInput = (e) => {setTitle(e.target.value)}
    const handleChangeInput2 = (e) => {setDescription(e.target.value)}

    const handleSubmitPost = () => {
        axios.post("http://127.0.0.1:8000/api/Books/"+index + 1+"/post/",{
            title : title,
            description : description,
        },
        {
            headers:{
                Authorization : `Token ${localStorage.getItem('token')}`
            }   
        })
        .then( res =>{
            navigate("/board/CategoryBooks/0");
        }
        )
    }

  return (
    <div className='Write_page'>
        <div className='Write_title'>
            <input value={title} onChange={handleChangeInput} />
        </div>
        <div className='Write_content'>
            <textarea value={description} onChange={handleChangeInput2} />
        </div>
        <div className='Write_addBtn'>
            <button onClick={handleSubmitPost}>추가하기</button>
        </div>
    </div>
  )
}

export default WritePage