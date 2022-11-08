import React from 'react';
import { toTitle } from '../../../functions/misc.functions';

const RadioInput = ({label,list,errors, register, name, classAdditional,disabled, checked}) => {
    return (
    <div className={`${classAdditional}`}>
        <p className="form-label me-3">{label}</p>
        {list?.map((el,index)=> {
            return (
            <div key={index} className="form-check form-check-inline">
                <input
                className={ `form-check-input  ${errors ? 'is-invalid'  : ''} `}
                {...register(name)}
                type="radio"
                id={el}
                name={name}
                value={el}
                disabled={disabled}
                checked={checked}
                />

                <label 
                className="form-check-label "
                htmlFor={el}
                >
                {toTitle(el)}
                </label>
            </div>
            )
        })}
        <p className="formErrorColor">{errors}</p>

    </div>
    )
}

export default RadioInput;
