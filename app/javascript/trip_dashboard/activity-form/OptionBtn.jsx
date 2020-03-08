import React, { useState, useEffect, useRef } from 'react'


const OptionBtn = ({name, selected, handleClick}) =>{
  return(
    <div onClick={handleClick} className={selected ? `selected`  : ''}  data-value={name}>{`#${name}`}</div>
  )
}

export default OptionBtn