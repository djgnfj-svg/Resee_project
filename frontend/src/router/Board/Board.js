import React from 'react'
import './Board.css'

function Board() {
  return (
    <div style={{display:"inline-block", margin:"0 auto" , marginTop : "100px"}}>
        <div className="board">
            <div className="books_img">
                <img src={`${process.env.PUBLIC_URL}/Img/books.png`} />
            </div>
            <div className="books_content">
                <div className='books_title'>리액트 전역 변수 설정</div>
                <div className='books_name'>생의 찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구함</div>
            </div>
        </div>
        <div className="board">
            <div className="books_img">
                <img src={`${process.env.PUBLIC_URL}/Img/books.png`} />
            </div>
            <div className="books_content">
                <div className='books_title'>리액트 전역 변수 설정</div>
                <div className='books_name'>생의 찬미를 듣는다 그것은 웅대한 관현악이며 미묘한 교향악이다 뼈 끝에 스며들어 가는 열락의 소리다이것은 피어나기 전인 유소년에게서 구하지 못할 바이며 시들어 가는 노년에게서 구하지 못할 바이며 오직 우리 청춘에서만 구함</div>
            </div>
        </div>
    </div>
  )
}

export default Board