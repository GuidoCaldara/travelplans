import React from 'react';
import './IconConfirm.scss'

const IconConfirm = () =>{
  return (
    <div className='animation-ctn'>
      <div className='icon icon--order-success svg'>
        <svg xmlns='http://www.w3.org/2000/svg' width='154px' height='154px'>  
          <g fill='none' stroke='#22AE73' strokeWidth='2'> 
            <circle id='circle-inner' cx='77' cy='77' r='72'></circle>
            <circle id='colored' fill='#22AE73' cx='77' cy='77' r='72' style={{'strokeDasharray':'480px 480px', 'strokeDashoffset': '960px'}}></circle>
            <polyline id='poly-circle' className='st0' stroke='#fff' strokeWidth='10' points='43.5,77.8 63.7,97.9 112.2,49.4'/>   
          </g> 
        </svg>
      </div>
    </div>
  )
}

export default IconConfirm