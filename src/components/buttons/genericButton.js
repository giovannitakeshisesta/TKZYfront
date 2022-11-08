import React from 'react'

export default function GenericButton({func,funcArg, classAdditional, text}) {
  return (
    <button 
    onClick={()=> func(funcArg)}
    className={classAdditional}
    >
    {text}
    </button>
  )
}
