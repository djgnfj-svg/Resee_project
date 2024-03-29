import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './WritePage.css'
import { useNavigate, useParams } from 'react-router-dom'
import maxLength, { maxTitleLength } from '../../../../components/MaxLength';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { BooksImageUpload, BooksPostUrl } from '../../../../components/ApiUrl';
import isLogin from '../../../../components/isLogin';


function WritePage() {

    const { id } = useParams() 
    const navigate = useNavigate();

    const titleRef = useRef(null)
    const textRef = useRef(null);
    const [ids, setIds] = useState([])

    const [scroll, setScroll] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescriptions] = useState("")
    const [spanBoolean , setSpanBoolean] = useState(true)

    useEffect(() => {
        if(!isLogin()){
            alert("로그인 후 이용해주세요")
            navigate("/login")
        }
    },[])


    // useEffect(() => { // esc 한번 더 클릭 시 포커스 이동
    //     function onkeyup(e){
    //         if(e.key === "Escape"){
    //             setScroll(false)
    //             titleRef.current.focus()
    //         }
    //     }
    //     window.addEventListener('keyup', onkeyup);
    //     return () => {
    //         window.removeEventListener('keyup', onkeyup);
    //     }
    // }, [description , scroll]);
   
    const handleChangeInput = (e) => { setTitle(e.target.value) }
    const handleChangeInput2 = (e) => {
        setDescriptions(
            textRef.current.getInstance().getMarkdown()
        )
    }

    const handleInputEnter = (e) => {
        if(e.key === "Enter"){
            textRef.current.getInstance().focus()
            setSpanBoolean(false)
        }
    }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요")
        } else if (title.length < maxTitleLength()) {
            alert(`제목을 ${maxTitleLength()} 이상 입력해주세요 !`)
        } else {
            const formData = {
                title: title,
                description: description,
                image_ids: ids
            }
            axios.post(BooksPostUrl(id), formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })
                .then(res => {
                    navigate(`/board/categorybooks/${id}/postreview/${res.data.id}`);
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
                    <input ref={titleRef} className='Write_title' onKeyUp={(e) => handleInputEnter(e)} placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
                </div>
                    <div className='title_span' >
                {spanBoolean && 
                        <span>제목 입력 후 엔터를 입력해보세요 !</span>
                    }
                </div>
            </>
            :
                <div className='title_pageScroll'>
                    
                </div>
            }
            {title.length >= 2 &&
                <>
                    <div className={scroll ? 'Write_pageScroll' : 'Write_page'} >
                        <Editor     
                            ref={textRef}
                            initialValue=""
                            previewStyle="vertical"
                            height="1050px" // mac = 800 //desctop  = 905
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
                            hooks={{
                                addImageBlobHook: async (blob, callback) => {
                                    await axios.post(BooksImageUpload(id), {
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
                                },
                            }}
                            
                        />
                    </div>
                    <div className='Write_addBtn' style={{ marginRight: "30px" }}>
                        <button onClick={() => handleSubmitPost()}>추가하기</button>
                    </div>
                </>
            }
        </div>
    )
}

export default WritePage