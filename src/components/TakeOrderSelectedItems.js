import React, { useEffect, useState } from "react";
import GenericButton from "./buttons/genericButton";
import TicketFooter from "./TicketFooter";
import TicketHeader from "./TicketHeader";

export function SortedItems({ typeName, renderedOrder }) {
  return (
    <>
      <>
        {renderedOrder.map((el) => {
          if (el.type === typeName && el.flow === 1) {
            return (
              <div key={el._id}>
                <div className="takeOrderSelectedItems2">
                  <p> {el.quantity}</p>
                  <p className="ms-3">{el.name}</p>
                </div>
                <p className="ticketMessage">{el.message}</p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </>
      <>
        {renderedOrder.some((el) => el.type === typeName && el.flow === 2) && (
          <p className="ticketLine"></p>
        )}
        {renderedOrder.map((el) => {
          if (el.type === typeName && el.flow === 2) {
            return (
              <div key={el._id}>
                <div className="takeOrderSelectedItems2">
                  <p> {el.quantity}</p>
                  <p className="ms-3">{el.name}</p>
                </div>
                <p className="ticketMessage">{el.message}</p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </>
    </>
  );
}

export default function TakeOrderSelectedItems({ order, functions, editBtn }) {
  const { clickSubmitOrder, clickUpdateOrder, clickDeleteOrder } = functions;
  const [renderedOrder, setRenderedOrder] = useState(order);
  const tableinfo = order[0];

  useEffect(() => {
    setRenderedOrder(order.sort((a, b) => a.flow - b.flow));
  }, [order]);
  return (
    <div className="takeOrderSelectedItemsMain">
      <div className="takeOrderSelectedItems">
        <TicketHeader {...tableinfo} />

        {renderedOrder?.length > 1 ? (
          <>
            {renderedOrder.some((el) => el.type === "Food") && (
              <p className="ticketType">Food</p>
            )}
            <SortedItems renderedOrder={renderedOrder} typeName="Food" />

            {renderedOrder.some((el) => el.type === "Drink") && (
              <p className="ticketType">Drinks</p>
            )}
            <SortedItems renderedOrder={renderedOrder} typeName="Drink" />
          </>
        ) : (
          <p>The order is empty.</p>
        )}

        <TicketFooter {...tableinfo} {...editBtn} />
      </div>

      <div className="takeOrderSelectedItemsBtnsDiv">
        {editBtn ? (
          <div className="editDeleteBtnDiv">
            <GenericButton
              text={"Save changes"}
              func={clickUpdateOrder}
              classAdditional={"button-80 tableTicketBtnSize"}
            />

            <GenericButton
              text={"Delete Order"}
              func={clickDeleteOrder}
              classAdditional={"button-80 tableTicketBtnSize"}
            />
          </div>
        ) : (
          renderedOrder?.length > 1 && (
            <GenericButton
              text={"Submit"}
              func={clickSubmitOrder}
              classAdditional={"button-80 tableTicketBtnSize"}
            />
          )
        )}
      </div>
    </div>
  );
}
