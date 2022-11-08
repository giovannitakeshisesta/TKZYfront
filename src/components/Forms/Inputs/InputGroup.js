import React from "react";
const InputGroup = ({ label, id, type, register, error ,duplicateErr,classWidth}) => {
  const isDuplicate = () =>{
    if (String(duplicateErr).includes(String(id)))  return true
  }

  return (
    <div className={`${classWidth}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <input
        type={type}
        id={id}
        {...register(id)}
        className={`form-control ${error || isDuplicate() ? 'is-invalid' : ''}`}
      />
      <p className="invalid-feedback">{error}</p>  
      {isDuplicate() && <p className="invalid-feedback">{duplicateErr}</p> }
    </div>
  )
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup