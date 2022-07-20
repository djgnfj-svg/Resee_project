import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WritePage.css'
import { useNavigate, useParams } from 'react-router-dom'

import maxLength from '../../../../components/description_maxLength';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


function WritePage() {

    const { id } = useParams();
    const { postid } = useParams()
    const navigate = useNavigate("");
    const textRef = React.createRef();
    const [ids, setIds] = useState([])

    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState({
        description: "",
    })
    const [imageIds, setImageIds] = useState([

    ]);
    const { description } = descriptions

    useEffect(() => {
        if (textRef.current) {
            textRef.current.getInstance().removeHook("addImageBlobHook");
            textRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                        /**
                         * 이미지 받아오는 함수를 실행합니다.
                         * blob 은 해당 이미지 파일이에요. 이 파일을 서버로 보내면 돼요.
                         * 받아온 이미지 주소를 callback 에 인수로 넣고, 두 번째 인수로는 alt 텍스트를 넣을 수 있어요. 아래의 모드는 예시입니다.
                         */
                        const formData = {
                            image: blob,
                            title: "aa",
                        }
                        await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`, {
                            image: blob,
                            title: "aa",
                        },
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                                },
                            }).then(res => {
                                setIds(ids.concat(res.data.id))
                                callback(res.data.image, "alt text");
                            })
                    })();

                    return false;
                });
        }

        return () => { };
    }, [textRef]);


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
        } else if (title === "") {
            alert("제목을 입력하지 않으셨어요 !")
        } else {
            const formData = {
                title: title,
                description: description,
                image_ids: ids
            }
            axios.post(`http://127.0.0.1:8000/api/books/${id}/post/`, formData,
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
            <div style={{ marginTop: "30px", textAlign: "left" }}>
                <input className='Write_title' maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
            </div>
            {title.length >= 2 &&
                <>
                    <div className='Write_page'>
                        <Editor
                            onFocus={true}
                            ref={textRef}
                            initialValue=""
                            previewStyle="vertical"
                            height="800px"
                            autofocus={false}
                            initialEditType="markdown"
                            theme='dark'
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
                        />
                    </div>
                    <div className='Write_addBtn' style={{ marginRight: "30px" }}>
                        <button onClick={(e) => handleSubmitPost(e)}>추가하기</button>
                    </div>
                </>
            }
        </div>
    )
}

export default WritePage