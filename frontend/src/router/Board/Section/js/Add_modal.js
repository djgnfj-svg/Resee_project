import React,{ useState } from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import '../css/Add_modal.css'

function Add_modal({ show }) {

    const [title , setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleChangeInput = (e) => { setDescription(e.target.value) };
    const change = (e) => { setTitle(e.target.value) }
    
    const handleSubmit = () =>{
        axios.post("http://127.0.0.1:8000/api/Books/",
        {
            title : title,
            rough_description : description,
        },
        {
            headers:{
                Authorization : `Token ${localStorage.getItem('token')}`
            }   
        }
        ).then(res => {
            console.log(res);
            show();
        }
        )
    }


    return (
        <>
          <Modal show={show} onHide={show} centered style={{borderRadius:"0.3rem"}}>
            <Modal.Header closeButton style={{backgroundColor:"#31313c" , borderBottom:"1px solid #515163"}}>
              <Modal.Title style={{color:"#FEFEFE" , fontSize:"19px" , fontWeight:"400"}}>추가하기</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor:"#31313c" , color:"#eaf7f9"}}>
                <div className='add_title'>
                    <div className='title'>제목</div>
                    <input placeholder='제목을 입력해주세요' value={title} name={title} onChange={change} />
                </div>
                <div className='add_description'>
                    <div className='description'>설명</div>
                    <textarea placeholder='40자 이내 설명을 입력해주세요.' value={description} name={description} onChange={handleChangeInput} />
                </div>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:"#31313c",border:"none"}}>
              <Button style={{ backgroundColor:"#31313c",height:"42px" ,border:"1px solid #515163" ,  width:"47%",position:"relative" , left:"-15px" , borderRadius:"0.3rem"}} onClick={show}>
                닫기
              </Button>
              <Button style={{width:"47%",height:"41px" ,  borderRadius:"0.3rem" , backgroundColor:"#00bba3" , border:"none"}} onClick={handleSubmit}>
                등록
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }

export default Add_modal