import React , {useEffect , useState} from 'react'
import './CategoryBooks.css'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

function CategoryBooks() {

  const navigate = useNavigate("");

  const [postList , setPostList] = useState("");

  useEffect(() => {
    getCategoryList();  
  }, [])
  

  const getCategoryList = () => {
    axios.get("http://127.0.0.1:8000/api/Books/1/post/",
    {
      headers:{
        Authorization : `Bearer ${localStorage.getItem('access_token')}`
    } 
    })
    .then(res => {
      setPostList(res.data)
      console.log(res.data)
    })
  }

  return (
    <>
    <div style={{margin:"0 auto" , display:"inline-block"}}>

        <div className='category'>
        <img src={`${process.env.PUBLIC_URL}/img/revels.png`} />
        <div className='wrapper_category'>
          <div className='category_List'>
            {postList && postList.map((item) => (
              <>
                <div className='books_title'>
                  <a style={{cursor:"pointer"}} onClick={() =>navigate("/board/CategoryBooks/Review")}><span style={{color:"#7b9acc`"}}>06.23 <tr /></span>{item.title}</a>
                </div>
              </>
            ))}
          </div>
        </div>
          </div>
          <div className='add_category'>
            <button onClick={() => navigate("/board/CategoryBooks/Write")}>추가하기</button>
            </div>
    </div>
    </>
  )
}

export default CategoryBooks