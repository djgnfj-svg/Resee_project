import React,{ useState } from 'react'
import './BooksReviewPage.css'
import axios from 'axios'
import './BooksReviewPage.css'
import {useNavigate} from 'react-router-dom'

function BooksReviewPage() {
    
    const [count,setCount] = useState(0);
    
    const navigate = useNavigate("");

    const handleChangeInput = (e) => {}
    const handleChangeInput2 = (e) => {}

    return (
        <div className='Write_page'>
            <div className='Write_title'>
                <input onChange={handleChangeInput} />
            </div>
            <div className='Write_content'>
                <textarea  onChange={handleChangeInput2} />
            </div>
            <div className='Write_addBtn'>
                <div style={{display:"flex" , flexDirection : "row" , width:"200px",textAlign:"center" , position:"relative"}}>
                    <div className='te' style={{ }}>
                        {/* count === 0 ? 이전 버튼 비활성화 : 이전 버튼 활성화 */}
                        <button onClick={() => setCount(count - 1)}>이전</button>
                    </div>
                    <span style={{color:"white" , marginTop:"2px"}}>1 / 7</span>
                    <div className='te' style={{}}>
                        {/* count === poistlish.length ? 다음 버튼 비활성화 : 다음버튼 활성화 */}
                        <button onClick={() => setCount(count + 1)}>다음</button>
                    </div>
            </div>
            </div>
        </div>
      )
}

export default BooksReviewPage