import React from 'react'
import { useNavigate } from 'react-router-dom'
import './EmailCheck.css'
function EmailCheck() {
    const navigate = useNavigate()
    return (
        <div className='EmailCheck_main'>
            <div>
                <div>
                    ReSee의 회원이 되신걸 환영해요<br />
                    이메일을 드렸어요! <br />이메일에 기재된링크를 클릭해서 이메일인증을 해주세요.
                </div>
                <button onClick={() => navigate("/login")}>Ok</button>
            </div>
        </div>
    )
}

export default EmailCheck
