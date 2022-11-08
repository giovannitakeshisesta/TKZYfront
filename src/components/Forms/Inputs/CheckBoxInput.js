import React from "react";

export default function CheckBoxInput({
  label,
  name,
  list,
  errors,
  register,
  classAdditional,
}) {
  return (
    <>
      {label && <p className="form-label">{label}</p>}

      <div className={`${classAdditional}`}>
        {list.map((el, index) => {
          return (
            <div key={index} className="form-check form-check-margin">
              <input
                className={`form-check-input ${errors ? "is-invalid" : ""} `}
                type="checkbox"
                id={el}
                value={el}
                {...register(name)}
              />
              <label className="form-check-label" htmlFor={el}>
                {el}
              </label>
            </div>
          );
        })}
      </div>
      {errors && <p className="formErrorColor">{errors}</p>}
    </>
  );
}
