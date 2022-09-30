import React from 'react'
import './TestEmailCheck.css'

function TestEmailChecked() {
    return (
        <div className='formEmailCheck'>
            <img src='https://c.tenor.com/1FRxK0qv1LUAAAAC/hello-hi.gif' />
            <h2>어서오세요 김수연님 : )</h2>
            <h2>ReSee와 함께하고싶다면 눌러주세요 !</h2>
            <h1>⬇︎</h1>
            <a href="{{ activate_url }}" target="_blank">
                <button>인증 하기</button>
            </a>
        </div>
    )
}

export default TestEmailChecked
