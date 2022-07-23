import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import maxLength, { maxTitleLength } from '../../../../components/MaxLength';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

function BooksChangeData() {

    const { id } = useParams();
    const { postId } = useParams();

    const navigate = useNavigate("");
    const textRef = React.createRef();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prevDescription, setPrevDescription] = useState("")
    const [ids, setIds] = useState([])

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        getBooksReviewData()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    const handleScroll = () => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if (window.scrollY >= 1) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    }

    const handleChangeInput = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeInput2 = (e) => {
        setDescription(textRef.current.getInstance().getMarkdown())

    }

    const getBooksReviewData = () => {
        axios.get(`http://127.0.0.1:8000/api/books/${id}/post/${postId}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setTitle(res.data.title)
            setDescription(res.data.description)
            setPrevDescription(res.data.description)
        }).catch(error => {

        })
    }

    const handleReplaceBack = () => {
        if(description === prevDescription){
            navigate(`/board/categorybooks/${id}/postreview/${postId}`)
        }else{
            const exit = window.confirm("지금 나가시면 수정하신 정보를 잃어버려요 !")
            if (exit === true) {
                navigate(`/board/categorybooks/${id}/postreview/${postId}`)
            } else if (exit === false) {}
        }
    }
        
    const handleInputEnter = (e) => {
        if (e.key === "Enter") {
            textRef.current.getInstance().focus()
            window.scrollTo({ top: 100, behavior: 'smooth' })
        }
    }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요");
        } else if (title === "") {
            alert(`제목을 ${maxTitleLength()} 이상 입력해주세요 !`)
        } else {
            axios.put(`http://127.0.0.1:8000/api/books/${id}/post/${postId}/`,
                {
                    title: title,
                    description: description,
                    image_ids: ids
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(res => {
                    navigate(`/board/categorybooks/${id}/postreview/${postId}`);
                    console.log(description)
                }
                ).catch(error => {

                })
        }
    }


    return (
        <div>
            {scroll === false ?
                <>
                    <div className="title_box">
                        <input className='Write_title' onKeyUp={(e) => handleInputEnter(e)} maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
                    </div>
                    <div className='title_span'>
                        <span></span>
                    </div>
                </>
                :
                <div className='title_pageScroll'>

                </div>
            }
            <div className={scroll ? 'Write_pageScroll' : 'Write_page'} >
                {description === true || title.length >= 2 && <>
                    <Editor
                        ref={textRef}
                        initialValue={description}
                        previewStyle="vertical"
                        height="805px"
                        autofocus={false}
                        initialEditType="markdown"
                        onChange={handleChangeInput2}
                        toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
                        theme='dark'
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
                                    image: blob,
                                    title: "aa",
                                }
                                await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`, formData,
                                    {
                                        headers: {
                                            "Content-Type": "multipart/form-data",
                                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                        },
                                    }).then(res => {
                                        callback(res.data.image, '이미지');
                                        setIds(ids.concat(res.data.id))
                                    }).catch(error => {
                                        console.log(error)
                                    })
                            },
                        }}
                    />
                </>}
            </div>
            <div className='Write_addBtn' style={{ position: "absolute", marginRight: "20px" }}>
                <button style={{ marginRight: "20px", border: "1px solid red" }} onClick={(e) => handleReplaceBack()}>취소</button>
                <button style={{}} onClick={(e) => handleSubmitPost(e)}>수정 완료</button>
            </div>
        </div>
    )
}

export default BooksChangeData