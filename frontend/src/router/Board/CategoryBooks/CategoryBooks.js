import React , {useEffect , useState} from 'react'
import './CategoryBooks.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function CategoryBooks() {

  const {id}  = useParams("");

  const navigate = useNavigate("");

  const [postList , setPostList] = useState("");

  useEffect(() => {
    getCategoryList();  
  }, [])
  

  const getAccessToken = () => {
    axios.post("http://127.0.0.1:8000/api/accounts/token/refresh/",
            {
                refresh:localStorage.getItem('refresh_token')
            }
        ).then(res => {
            localStorage.setItem('access_token', "lostark")
            localStorage.setItem('access_token',res.data.access)
            getCategoryList();
        })
}

  const getCategoryList = () => {
    axios.get(`http://127.0.0.1:8000/api/Books/${id}/post/`,
    {
      headers:{
        Authorization : `Bearer ${localStorage.getItem('access_token')}`
    } 
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "Post가 없습니다."){
        
      }else{
        setPostList(res.data)
      }
    }).catch(error => {
      getAccessToken();
  })
  }

  return (
    <>
    <div style={{margin:"0 auto" , display:"inline-block"}}>

        <div className='category'>
        <img src={`${process.env.PUBLIC_URL}/img/revels.png`} />
        <div className='wrapper_category'>
          <div className='category_List'>
            {postList &&  postList.map((item,index) => (
              <>
                <div className='books_title'>
                  <div style={{textAlign:"right" , fontSize:"13px"}}>{item.created_at}</div>
                  <a style={{cursor:"pointer"}} onClick={() =>navigate(`/board/CategoryBooks/${id}/postReview/${item.id}`)}><span style={{color:"#7b9acc`"}}>{item.title}</span></a>
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
            <button onClick={() => navigate(`/board/CategoryBooks/${id}/Write`)} disabled={postList.length === 12 ? true : false} >추가하기</button>
            </div>
    </div>
    </>
  )
}

export default CategoryBooks