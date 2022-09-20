import React from 'react'
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import './Footbar.css'

function Footbar() {
  
  const b_hyoungGit = `https://github.com/b-hyoung`

  return (
    <>
    <div style={{cursor : "default"}}>Developer</div>
        <div className='develop'>
          <div className='frontend'>
            <div style={{cursor : "default"}}>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span>Frontend : 박형석</span>
            </div>
            <div onClick={() => window.open(`https://github.com/b-hyoung`,'_blank')}>
              <span className='foot_img'><FaGithub /></span>
              <span style={{cursor : "pointer"}}>https://github.com/b-hyoung</span>
            </div>
          </div>
          <div className='frontend'>
           <div style={{cursor : "default"}}>
              <span className='foot_img'><BsFillPersonFill /></span>
              <span >Backend : 송영재</span>
            </div>
            <div onClick={() => window.open('https://github.com/djgnfj-svg','_blank')}>
              <span className='foot_img'><FaGithub /></span>
              <span style={{cursor : "pointer"}}>https://github.com/djgnfj-svg</span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Footbar

