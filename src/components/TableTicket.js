import React from "react";
import GenericButton from "./buttons/genericButton";
import KitchenTicket from "./KitchenTicket";

export default function TableTicket({
  ordersSelectedTable,
  clikEditOrder,
  clickAddOrder,
  clickShowBillTotal,
}) {
  return (
    <div className="tableTicketMain">
      <div className="tableTicketInner">
        <div className="tableTicketDiv">
          {ordersSelectedTable.map((order) => {
            return (
              <div className="tableTicket" key={order._id}>
                <KitchenTicket order={order} clikEditOrder={clikEditOrder} />
              </div>
            );
          })}
        </div>

        <div className="tableTicketBtnDiv">
          <GenericButton
            text={"New order"}
            func={clickAddOrder}
            classAdditional={"button-80 tableTicketBtnSize"}
          />
          <GenericButton
            text={"Pay"}
            func={clickShowBillTotal}
            classAdditional={"button-80 tableTicketBtnSize"}
          />
        </div>
      </div>
    </div>
  );
}
