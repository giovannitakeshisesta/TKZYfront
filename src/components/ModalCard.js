import React from "react";

const ModalCard = ({ setmodal, header, body }) => {
  return (
    <>
      <i
        className="fa-regular fa-circle-xmark topBtnStyle topRightPosition"
        onClick={() => setmodal(false)}
      ></i>
      <div className="classModalHeader">
        <h1>{header}</h1>
      </div>
      <div className="classModalBody">
        {body}

      </div>
    </>
  );
};

export default ModalCard;
