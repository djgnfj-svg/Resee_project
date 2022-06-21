import axios from 'axios'
import React, { useState } from 'react'
import './WritePage.css'
import {useNavigate} from 'react-router-dom'

function WritePage() {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    const navigate = useNavigate("");

    const handleChangeInput = (e) => {setTitle(e.target.value)}
    const handleChangeInput2 = (e) => {setDescription(e.target.value)}

    const handleSubmitPost = () => {
        axios.post("http://127.0.0.1:8000/api/Books/40/post/",{
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
            <div style={{display:"flex" , flexDirection : "row" , position:"relative" , left:"100px"}}>
                <div className='te' style={{ }}>
                    <button onClick={handleSubmitPost}>이전</button>
                </div>
                <span style={{color:"white" , marginTop:"2px"}}>1 / 7</span>
                <div className='te' style={{}}>
                    <button onClick={handleSubmitPost}>다음</button>
                </div>
        </div>
        </div>
    </div>
  )
}

export default WritePage