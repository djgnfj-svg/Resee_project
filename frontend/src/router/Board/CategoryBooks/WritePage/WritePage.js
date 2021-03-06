import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WritePage.css'
import { useNavigate, useParams } from 'react-router-dom'

import maxLength, { maxTitleLength } from '../../../../components/MaxLength';

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

    const [scroll, setScroll] = useState(false);

    const [title, setTitle] = useState("")
    const [descriptions, setDescriptions] = useState({
        description: "",
    })
    const { description } = descriptions
    const [spanBoolean , setSpanBoolean] = useState(true) 


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, []);

    useEffect(() => {
        function onkeydown(e) {
            if (e.key === "Control") {
                console.log("aaa")
             }
        }
        function onkeyup(e){
            if(e.key === 'Enter'){
                console.log("ddd")
            }
        }
        window.addEventListener('keyup', onkeyup);
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
            window.removeEventListener('keyup', onkeyup);
        }
    }, []);
 

    useEffect(() => {
        if (textRef.current) {
            textRef.current.getInstance().removeHook("addImageBlobHook");
            textRef.current
                .getInstance()
                .addHook("addImageBlobHook", (blob, callback) => {
                    (async () => {
                        /**
                         * ????????? ???????????? ????????? ???????????????.
                         * blob ??? ?????? ????????? ???????????????. ??? ????????? ????????? ????????? ??????.
                         * ????????? ????????? ????????? callback ??? ????????? ??????, ??? ?????? ???????????? alt ???????????? ?????? ??? ?????????. ????????? ????????? ???????????????.
                         */
                        await axios.post(`http://127.0.0.1:8000/api/books/post/${id}/imgs/`, {
                            image: blob,
                            title: " ",
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
        // ???????????? Top?????? 50px ?????? ???????????? true?????? useState??? ?????????
        if(window.scrollY >= 10){
            setScroll(true);
            setSpanBoolean(false)
        }else{
        // ???????????? 50px ??????????????? false??? ?????????
            window.scrollTo({top:0})
        }
    }

    const handleChangeInput = (e) => { setTitle(e.target.value) }
    const handleChangeInput2 = (e) => {
        setDescriptions({
            description: textRef.current.getInstance().getMarkdown()
        })
    }

    const handleInputEnter = (e) => {
        if(e.key === "Enter"){
            textRef.current.getInstance().focus()
            window.scrollTo({top : 550,behavior:'smooth'})
            setScroll(true);
            setSpanBoolean(false)
        }
    }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "?????? ???????????? ??????????????????")
        } else if (title < maxTitleLength()) {
            alert(`????????? ${maxTitleLength()} ?????? ?????????????????? !`)
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
                    
                })
        }
    }


    return (
        <div>
            {scroll === false ?
            <>
                <div className="title_box">
                    <input className='Write_title' onKeyUp={(e) => handleInputEnter(e)} maxLength="9" placeholder='????????? ??????????????????' value={title} onChange={handleChangeInput} />
                </div>
                    <div className='title_span' >
                {spanBoolean && 
                        <span>?????? ?????? ??? ????????? ?????????????????? !</span>
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
                            height="840px" // mac = 800 //desctop  = 905
                            autofocus={false}
                            initialEditType="markdown"
                            theme='dark'
                            useCommandShortcut={true}
                            onChange={handleChangeInput2}
                            toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
                            plugins={[
                                [
                                    colorSyntax,
                                    // ?????? ?????? preset ??????
                                    {
                                        preset: ['#1F2E3D', '#4c5864', '#ED7675']
                                    }
                                ]
                            ]}
                        />
                    </div>
                    <div className='Write_addBtn' style={{ marginRight: "30px" }}>
                        <button onClick={(e) => handleSubmitPost(e)}>????????????</button>
                    </div>
                </>
            }
        </div>
    )
}

export default WritePage