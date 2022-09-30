import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import maxLength, { maxTitleLength } from '../../../../components/MaxLength';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { BooksImageUpload, BooksPostDataUrl } from '../../../../components/ApiUrl';
import isLogin from '../../../../components/isLogin';

function BooksChangeData() {

    const { id } = useParams();
    const { postId } = useParams();

    const navigate = useNavigate("");
    const titleRef = React.createRef();
    const textRef = React.createRef();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prevDescription, setPrevDescription] = useState("")
    const [ids, setIds] = useState([])

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        getBooksReviewData()
    }, [])

    // useEffect(() => { // esc 클릭 시 제목 포커스 한번더 누르면 그곳으로 이동함
    //     function onkeyup(e){
    //         if(e.key === "Escape"){
    //             setScroll(false)
    //             window.scrollTo({top:0 , behavior : "smooth"})
    //         }
    //     }
    //     window.addEventListener('keyup', onkeyup);
    //     return () => {
    //         window.removeEventListener('keyup', onkeyup);
    //     }
    // }, [description ,scroll]);

    const handleChangeInput = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeInput2 = (e) => {
        setDescription(textRef.current.getInstance().getMarkdown())
    }

    const getBooksReviewData = () => {
        axios.get(BooksPostDataUrl(id , postId), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(res => {
            setTitle(res.data.title)
            setDescription(res.data.description)
            setPrevDescription(res.data.description)
        }).catch(error => {
            if(error.response.status === 403) {
                alert("로그인 후 진행해주세요")
                navigate("/login")
              }else if (error.response.status === 429) {
                alert("요청이 많습니다 잠시만 기다려주세요");
                navigate("/board/toomanyrequest")
              }
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
        }
    }

    const handleSubmitPost = () => {
        if (description.length > maxLength()) {
            alert(maxLength() + "글자 미만으로 입력해주세요");
        } else if (title === "") {
            alert(`제목을 ${maxTitleLength()} 이상 입력해주세요 !`)
        } else {
            axios.put(BooksPostDataUrl(id , postId),
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
                        <input className='Write_title' ref={titleRef} onKeyUp={(e) => handleInputEnter(e)} maxLength="9" placeholder='제목을 입력해주세요' value={title} onChange={handleChangeInput} />
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
                {((description === true) || (title.length >= 2)) && <>
                    <Editor
                        ref={textRef}
                        initialValue={description}
                        previewStyle="vertical"
                        height="900px"
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
                                await axios.post(BooksImageUpload(id), formData,
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