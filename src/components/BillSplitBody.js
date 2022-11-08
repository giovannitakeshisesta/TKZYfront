import React from "react";

export default function BillSplitBody({
  renderedTot,
  clickAddSubTot,
  clickRemoveSubTot,
}) {
  return (
    <>
      {renderedTot.map((el) => {
        return (
          <div key={el._id}>
            {el.order.map((item) => {
              if (!item.table) {
                return (
                  <div key={item._id} className="frca">
                    <p className="billSplitQty">{item.quantity}</p>
                    <p className="billSplitName">{item.name}</p>
                    <i
                      className="billSplitIcon fas fa-plus-circle "
                      onClick={() => clickAddSubTot(item, el._id)}
                    ></i>
                    <i
                      className="billSplitIcon fa-solid fa-minus-circle"
                      onClick={() => clickRemoveSubTot(item, el._id)}
                    ></i>
                  </div>
                );
              } else return null;
            })}
            <br />
          </div>
        );
      })}
    </>
  );
}
