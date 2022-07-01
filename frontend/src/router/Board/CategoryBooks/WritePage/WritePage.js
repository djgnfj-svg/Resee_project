import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import './WritePage.css'
import {useNavigate, useParams} from 'react-router-dom'
import InputComponent from '../../../../components/InputComponent'
import ReactMarkdown from 'react-markdown'

function WritePage() {

    const {id} = useParams();
    const navigate = useNavigate("");
    const textRef = React.createRef();
    const markdown = `Just a link: https://reactjs.com.`
    
    const [title,setTitle] = useState("")
    const [testing , setTesting] = useState([[{text : ""}]])
    const [descriptions, setDescriptions] = useState({
        description: "",
    })
    const {description} = descriptions

    const handleChangeInput2 = (e) => {
        setDescriptions({
            description : e.target.value
        })
        console.log("test22")
    }


    const handleResizeInput = () => {
        const obj = textRef.current
        obj.style.height = "auto";
        obj.style.height = obj.scrollHeight + 'px';
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

  return (
    <div className='Write_page'>
        <div className='Write_content' id='Write'>
            <div className='testing'>
                <textarea ref={textRef} onKeyDown={handleResizeInput} onKeyUp={handleResizeInput} value={description} onChange={handleChangeInput2}  placeholder="내용을 입력해주세요" />
            </div>
        </div>
            <ReactMarkdown children={description} className="markdown" placeholder="입력해주세요" >
            </ReactMarkdown>
        {/* <div className='Write_addBtn'>
            <button onClick={() => handleSubmitPost()}>추가하기</button>
        </div> */}
    </div>
  )
}

export default WritePage