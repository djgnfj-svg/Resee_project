import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WritePage.css'
import { useNavigate, useParams } from 'react-router-dom'

import maxLength from '../../../../components/description_maxLength';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


function WritePage() {

    const { id } = useParams();
    const navigate = useNavigate("");
    const textRef = React.createRef();

    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState({
        description: "",
    })
    const [imageURL , setImageURL] = useState("");
    const { description } = descriptions

    const handleChangeInput = (e) => { setTitle(e.target.value) }

    const handleChangeInput2 = (e) => {
        setDescriptions({
            description: textRef.current.getInstance().getMarkdown()
        })
    }
    const getAccessToken = () => {
        axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
            {
                refresh: localStorage.getItem('refresh_token')
            }
        ).then(res => {
            localStorage.setItem('access_token', res.data.access)
            handleSubmitPost();
        })
    }

    // const uploadImage = async (blob) => {
    //     const formData = {
    //         image : blob,
    //         title : "aa",
    //         post : 1,
    //     }
    //     await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`,formData ,
    //     {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //           },
    //     }).then(res => {
    //         setImageURL(res.data.image)
    //         console.log(res.data.image)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요")
        }else if(title === ""){
            alert("제목을 입력하지 않으셨어요 !")
        }else {
            axios.post(`http://127.0.0.1:8000/api/books/${id}/post/`, {
                title: title,
                description: description,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(res => {
                    navigate(`/board/categorybooks/${id}`);
                }
                ).catch(error => {
                    getAccessToken();
                })
        }
    }


    return (
        <div>
            <div style={{ marginTop: "30px" }}>
                <input className='Write_title' maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
            </div>
            <div className='Write_page'>
                <Editor
                    onFocus={true}
                    ref={textRef}
                    initialValue=""
                    previewStyle="vertical"
                    height="800px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                    onChange={handleChangeInput2}
                    toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
                    plugins={[
                        [
                            colorSyntax,
                            // 기본 색상 preset 적용
                            {
                                preset: ['#1F2E3D', '#4c5864', '#ED7675']
                            }
                        ]
                    ]}
                    hooks={{
                        addImageBlobHook: async (blob, callback) => {
                            const formData = {
                                image : blob,
                                title : "aa",
                                post : 1,
                            }
                            await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`,formData ,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                  },
                            }).then(res => {
                                callback(res.data.image, '이미지');
                                console.log(res.data.image)
                            }).catch(error => {
                                console.log(error)
                            })
                        }
                      }}
                />
            </div>
            <div className='Write_addBtn'>
                <button onClick={(e) => handleSubmitPost(e)}>추가하기</button>
            </div>
        </div>
    )
}

export default WritePage