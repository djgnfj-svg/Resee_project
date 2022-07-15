import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom'

import ReactMarkdown from 'react-markdown'
import maxLength from '../../../../components/description_maxLength';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import markdownIt from "markdown-it";
import DOMPurify from "dompurify";

function BooksChangeData() {

    const { id } = useParams();
    const { postId } = useParams();

    const navigate = useNavigate("");
    const textRef = React.createRef();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [postList, setPostList] = useState("");



    const handleChangeInput = (e) => { setTitle(e.target.value) }

    const handleChangeInput2 = (e) => {
        setDescription(textRef.current.getInstance().getMarkdown())
    }

    useEffect(() => {
        getBooksReviewData()
    }, [])

    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
            {
                refresh: localStorage.getItem('refresh_token')
            }
        ).then(res => {
            localStorage.setItem('access_token', "lostark")
            localStorage.setItem('access_token', res.data.access)
            getBooksReviewData()
        })
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
            getAccessToken();
        })
    }

    const handleReplaceBack = () => {
        const exit =  window.confirm("지금 나가시면 수정하신 정보를 잃어버려요 !")
        if(exit === true){
            navigate(`/board/CategoryBooks/${id}/postReview/${postId}`)
        }else if(exit === false){

        }
    }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요");

        } else if (title === "") {
            alert("제목을 입력해주세요!")
        } else {
            axios.put(`http://127.0.0.1:8000/api/Books/${id}/post/${postId}/`, {
                title: title,
                description: description,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(res => {
                    navigate(`/board/CategoryBooks/${id}/postReview/${postId}`);
                }
                ).catch(error => {
                    getAccessToken()
                })
        }
    }


    return (
        <div>
            <div style={{ marginTop: "30px" }}>
                <input className='Write_title' maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
            </div>
            <div className='Write_page'>
                {description && <>
                    <Editor 
                        onFocus={true}
                        ref={textRef}
                        initialValue={description}
                        previewStyle="vertical"
                        height="800px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        onChange={handleChangeInput2}
                        plugins={[
                            [
                                colorSyntax,
                                // 기본 색상 preset 적용
                                {
                                    preset: ['#1F2E3D', '#4c5864', '#ED7675']
                                }
                            ]
                        ]}
                    />
                </>}
            </div>
            <div className='Write_addBtn' style={{ marginTop: "20px",marginRight:"100px" }}>
                <button style={{marginRight:"20px" , backgroundColor:"#E62e3d"}} onClick={(e) => handleReplaceBack()}>취소</button>
                <button onClick={(e) => handleSubmitPost(e)}>수정 완료</button>
            </div>
        </div>
    )
}

export default BooksChangeData