import React from 'react'
import './Footbar.css'

function Footbar() {
  
  return (
    <>
    <div style={{cursor : "default"}}>Developer</div>
        <div className='develop'>
          <div className='frontend'>
            <div style={{cursor : "default"}}>
              <span>Frontend : 박형석</span>
            </div>
            <div onClick={() => window.open(`https://github.com/b-hyoung`,'_blank')}>
              <span style={{cursor : "pointer"}}>https://github.com/b-hyoung</span>
            </div>
          </div>
          <div className='frontend'>
           <div style={{cursor : "default"}}>
              <span >Backend : 송영재</span>
            </div>
            <div onClick={() => window.open('https://github.com/djgnfj-svg','_blank')}>
              <span style={{cursor : "pointer"}}>https://github.com/djgnfj-svg</span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footbar

