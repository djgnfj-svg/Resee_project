import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client';
import './WritePage.css'
import {useNavigate, useParams} from 'react-router-dom'
import InputComponent from '../../../../components/InputComponent'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import maxLength from '../../../../components/description_maxLength';


function WritePage() {

    const {id} = useParams();
    const navigate = useNavigate("");
    const textRef = React.createRef();

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
    
    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
                {
                    refresh:localStorage.getItem('refresh_token')
                }
            ).then(res => {
                localStorage.setItem('access_token', "lostark")
                localStorage.setItem('access_token',res.data.access)
                handleSubmitPost();
            })
    }


    const handleSubmitPost = () => {
        if(description.length > maxLength()){
            alert(maxLength()+"글자 미만으로 입력해주세요")
        }else{
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
            ).catch(error => {
                getAccessToken();
            })
        }
        }
        
        
        return (
            <div>
        <div style={{marginTop:"30px"}}>
            <input className='Write_title' maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
        </div>
    <div className='Write_page'>
        <div className='Write_content' id='Write'>
            <div className='testing'>
                <textarea autoFocus  value={description} onChange={handleChangeInput2}  placeholder="내용을 입력해주세요" />
            </div>
        </div>
            <ReactMarkdown ref={textRef} remarkPlugins={[remarkGfm]} children={description} components={{img: ({node, ...props}) => <img style={{maxWidth: '100%'}}{...props} alt=""/>}}  className="markdown" placeholder="입력해주세요" >
            </ReactMarkdown>
    </div>
        <div className='Write_addBtn'>
            <button onClick={(e) => handleSubmitPost(e)}>추가하기</button> 
        </div>
    </div>
  )
}

export default WritePage