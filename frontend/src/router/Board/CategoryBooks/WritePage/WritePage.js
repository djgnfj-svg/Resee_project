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


function WritePage() {

    const { id } = useParams() 
    const navigate = useNavigate();

    const titleRef = React.useRef<HTMLInputElement>(null)
    const textRef = React.useRef<HTMLInputElement>(null);
    const [ids, setIds] = useState([])

    const [scroll, setScroll] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescriptions] = useState("")
    const [spanBoolean , setSpanBoolean] = useState(true) 


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    useEffect(() => { // esc 한번 더 클릭 시 포커스 이동
        function onkeyup(e: { key: string; }){
            if(e.key === "Escape"){
                setScroll(false)
                titleRef.current.focus()
            }
        }
        window.addEventListener('keyup', onkeyup);
        return () => {
            window.removeEventListener('keyup', onkeyup);
        }
    }, [description || scroll]);
 

    useEffect(() => {
        if (textRef.current) {
            textRef.current.getInstance().removeHook("addImageBlobHook");
            textRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob: any, callback: (arg0: any, arg1: string) => void) => {
                    (async () => {
                        /**
                         * 이미지 받아오는 함수를 실행합니다.
                         * blob 은 해당 이미지 파일이에요. 이 파일을 서버로 보내면 돼요.
                         * 받아온 이미지 주소를 callback 에 인수로 넣고, 두 번째 인수로는 alt 텍스트를 넣을 수 있어요. 아래의 모드는 예시입니다.
                         */
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
                    })();

                    return false;
                });
        }
        return () => { };
    }, [textRef]);

    const handleScroll = () => {
        // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
        if(window.scrollY >= 50){
            setScroll(true);
            setSpanBoolean(false)
        }else{
        // 스크롤이 50px 미만일경우 false를 넣어줌
            setScroll(false);
        }
    }
   
    const handleChangeInput = (e: { target: { value: React.SetStateAction<string>; }; }) => { setTitle(e.target.value) }
    const handleChangeInput2 = (e: any) => {
        setDescriptions(
            textRef.current.getInstance().getMarkdown()
        )
    }

    const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            textRef.current.getInstance().focus()
            window.scrollTo({top : 550,behavior:'smooth'})
            setScroll(true);
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
                    navigate(`/board/categorybooks/${id}/postrivew/${res.data.id}`);
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