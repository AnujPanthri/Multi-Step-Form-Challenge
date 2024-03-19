import React from 'react'
import "./Step.css";

function Step({
  isActive,
  number,
  title,
}) {
  return (
    <div className={"step " + (isActive ? "active" : "")} >
      <div className="step__index">{number}</div>
      <div className='step__group'>
        <p className="step__text">Step {number}</p>
        <p className="step__title">{title}</p>
      </div>
    </div>
  )
}

export default Step