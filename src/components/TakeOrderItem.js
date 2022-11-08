import React from "react";

export default function TakeOrderItem({ item, order, functions }) {
  const { name, _id, flow } = item;
  const {
    clickChangeFlow,
    clickAddOneItem,
    clickDeleteOneItem,
    clickOpenModalDescription,
    clickOpenModalMsg,
  } = functions;
  return (
    <div className="takeOrderItem">
      <p className="itemName" onClick={() => clickOpenModalDescription(item)}>
        {name}
      </p>
      <div className="itemAllIconsDiv">
        <i
          className="fa-solid fa-plus iconItem itemPlus"
          onClick={() => clickAddOneItem(_id)}
        ></i>

        {order.filter((el) => el._id === _id)[0]?.quantity > 0 && (
          <div className="itemRest">
            <i
              className="fa-solid fa-minus iconItem"
              onClick={() => clickDeleteOneItem(_id)}
            />
            <i
              className="fas fa-ellipsis-h iconItem"
              onClick={() => clickChangeFlow(_id, flow)}
            />
            <i
              className="fas fa-comment iconItem"
              onClick={() => clickOpenModalMsg(_id)}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
}
