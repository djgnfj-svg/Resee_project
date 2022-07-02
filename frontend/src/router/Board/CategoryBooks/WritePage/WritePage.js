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

    const handleChangeInput = (e) => {setTitle(e.target.value)}

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

    const handleEnterInput = (e) => {
        // const str = e.target.value;
        // const last = str.charAt(str.length - 1);
        // const result = last.split(last)[1]
        // if(e.key === "Enter"){
        //     result
        // }    
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
    <div>
        <div style={{marginTop:"30px"}}>
            <input className='Write_title' placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
        </div>
    <div className='Write_page'>
        <div className='Write_content' id='Write'>
            <div className='testing'>
                <textarea autoFocus onKeyPress={(e) => handleEnterInput(e)} ref={textRef} onKeyDown={handleResizeInput} onKeyUp={handleResizeInput} value={description} onChange={handleChangeInput2}  placeholder="내용을 입력해주세요" />
            </div>
        </div>
            <ReactMarkdown children={description} className="markdown" placeholder="입력해주세요" >
            </ReactMarkdown>
    </div>
        <div className='Write_addBtn'>
            <button onClick={(e) => handleSubmitPost(e)}>추가하기</button> 
        </div>
    </div>
  )
}

export default WritePage