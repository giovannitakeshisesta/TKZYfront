import React from 'react'

export default function BackBtn({func}) {
  return (
    <i
    className="fa-solid fa-circle-arrow-left topBtnStyle topRightPosition"
    onClick={func}
></i>
  )
}
