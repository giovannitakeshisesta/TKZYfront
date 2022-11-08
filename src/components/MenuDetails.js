import React from "react";
import { findByIdAndDeleteMenu } from "../services/MenuService";
import BackBtn from "./buttons/BackBtn";
import {toTitle} from '../functions/misc.functions' 
import GenericButton from "./buttons/genericButton";

export default function MenuDetails({ data, closeDetails, editItem }) {

  const deleteItem = (id) => {
    findByIdAndDeleteMenu(id)
      .then((response) => {
        closeDetails()
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="menuDetailsMain">
      <div>
        {closeDetails && editItem &&
        <div className="topRightPosition2">
          <BackBtn func={() => closeDetails()}/>
        </div>
        }
        <div className="menuDetailsBody">
          <div className="itemDescription">
            <div className="frcb">
              <h2 >{data.name}</h2>
              <h2 style={{width:"90px", textAlign:"end"}}>{data.price} €</h2>
            </div>
            <p><b>Course</b> : {toTitle(data.course)}</p>
            <p className="mb-1"><b>Allergens</b> : {data.allergens === 'false' ? "None" : data.allergens.join(', ')}</p>
            <b>Description</b>
            <p>{data.description}</p>
          </div>
          <img className="itemImg" src={data.image} alt="product" />
        </div>
      </div>

      {closeDetails && editItem &&
        <div className="menuDetailsBtnDiv ">
          <GenericButton
              text={"Edit"}
              func={editItem}
              funcArg={data}
              classAdditional={"button-59 btnEditDetails"}
            />

            <GenericButton
              text={"Delete"}
              func={deleteItem}
              funcArg={data._id}
              classAdditional={"button-59 btnEditDetails"}
            />
        </div>
      
      }
    </div>
  );
}
