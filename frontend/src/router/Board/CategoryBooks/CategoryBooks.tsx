import React , {useEffect , useState} from 'react'
import './CategoryBooks.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import { BooksListUrl } from '../../../components/ApiUrl';
import isLogin from '../../../components/isLogin';

function CategoryBooks() {

  type Books = {
    id:number;
    title:string;
    created_at:string;
  }


  const {id} = useParams() as any;
  const navigate = useNavigate();
  
  const [postList , setPostList] = useState([]);

  useEffect(() => {
    getCategoryList();  
    //eslint-disable-next-line
  }, [])

  const getCategoryList = () => {
    axios.get(BooksListUrl(id),
    {
      headers:{
        Authorization : `Bearer ${localStorage.getItem('access_token')}`
    } 
    })
    .then(res => {
      if(res.data.msg === "Post가 없습니다."){
        
      }else{
        setPostList(res.data)
      }
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
  
  return (
    <>
    <div style={{margin:"0 auto" , display:"inline-block"}}>
        <div className='category'>
        <img alt='img' src={`${process.env.PUBLIC_URL}/img/revels.png`} />
        <div className='wrapper_category'>
          <div className='category_List'>
        <div className='closeBooks'><button className='closeBooksBtn' onClick={() => navigate("/board")}>책 닫기</button></div>
            {postList &&  postList.map((item:Books) => (
              <>
                <div className='books_title'>
                  <div style={{textAlign:"right" , fontSize:"13px"}}>{item.created_at}</div>
                  <a href='#!' style={{cursor:"pointer"}} onClick={() =>navigate(`/board/categoryBooks/${id}/postreview/${item.id}`)}><span style={{color:"#7b9acc`"}}>{item.title}</span></a>
                </div>
              </>
            ))}
            {postList && postList===null && (
              <>
              </>
            )}
          </div>
        </div>
          </div>
          <div className='add_category'>
            <button onClick={() => navigate(`/board/categorybooks/${id}/write`)} disabled={postList.length === 12 ? true : false} >추가하기</button>
            {postList.length === 12 && 
            <>
              <div>책은 최대 12개 까지만 생성 가능합니다.</div>
              <div style={{color:"#c7c7c7" , fontSize:"14px" }}>추가 생성을 원한다면 ? <a href='#!' style={{marginLeft:"5px" , color:"white" ,fontSize:"14.5px" ,  textDecoration:"underline" ,}}>Go Premium</a></div>
            </>}
            </div>
    </div>
    </>
  )
}

export default CategoryBooks