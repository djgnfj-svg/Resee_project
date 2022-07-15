import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import './WritePage.css'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import maxLength from '../../../../components/description_maxLength';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import markdownIt from "markdown-it";
import DOMPurify from "dompurify";

function WritePage() {

    const { id } = useParams();
    const navigate = useNavigate("");
    const textRef = React.createRef();

    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState({
        description: "",
    })
    const { description } = descriptions

    const sanitizer = DOMPurify.sanitize;

    // useEffect(() => {
    //     if (textRef.current) {
    //       textRef.current.getInstance().removeHook("addImageBlobHook");
    //       textRef.current
    //         .getInstance()
    //         .addHook("addImageBlobHook", (blob, callback) => {
    //           (async () => {
    //             let formData = new FormData();
    //             formData.append("file", blob);
    
    //             axios.defaults.withCredentials = true;
    //             const { data: url } = await axios.post(
    //               `${backUrl}image.do`,
    //               formData,
    //               {
    //                 header: { "content-type": "multipart/formdata" },
    //               }
    //             );
    //             callback(url, "alt text");
    //           })();
    
    //           return false;
    //         });
    //     }
    
    //     return () => {};
    //   }, [textRef]);

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
            localStorage.setItem('access_token', "lostark")
            localStorage.setItem('access_token', res.data.access)
            handleSubmitPost();
        })
    }
    const uploadImage = async (blob) => {
        const formData = new FormData();
        formData.append('image',blob);

        const url = await axios.post('url',{
            body : formData
        })
        return url
    }


    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요")
        }else if(title === ""){
            alert("제목을 입력하지 않으셨어요 !")
        }else {
            axios.post(`http://127.0.0.1:8000/api/Books/${id}/post/`, {
                title: title,
                description: description,
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(res => {
                    navigate(`/board/CategoryBooks/${id}`);
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
                          
                          console.log(blob);  // File {name: '카레유.png', ... }
              
                          // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                          // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...
                          const imgUrl = uploadImage(blob)
              
                          // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                          callback(imgUrl, '카레유');
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