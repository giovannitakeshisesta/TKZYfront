import React from "react";
import GenericButton from "./buttons/genericButton";
import TicketFooter from "./TicketFooter";
import TicketHeader from "./TicketHeader";

// export function FlowList({ orderList, flow, type,clickCrossItem }) {
export function FlowList({ order, flow, type, clickCrossItem }) {
  const orderList = order.order;
  const orderId = order._id;

  return orderList.map((item) => {
    return (
      !item.table &&
      item.type === type && (
        <div key={item._id}>
          {item.flow === flow && (
            <>
              <div className="frcb">
                {clickCrossItem ? (
                  <p
                    className={item.isDone ? "isDone" : ""}
                    onClick={() => clickCrossItem(item._id, orderId)}
                  >
                    {item.name}
                  </p>
                ) : (
                  <p className={item.isDone ? "isDone" : ""}>{item.name}</p>
                )}
                <p>{item.quantity}</p>
              </div>
              <p className="ticketMessage">{item.message}</p>
            </>
          )}
        </div>
      )
    );
  });
}

export default function KitchenTicket({
  order,
  clikEditOrder,
  clickCrossItem,
}) {
  const orderList = order.order;
  const tableinfo = orderList[0];
  return (
    <div
      className="kitchenTicketMain"
      style={{ width: clickCrossItem ? "250px" : null }}
    >
      {/* {orderList[0]?.table && <TicketHeader {...tableinfo} />} */}
      <TicketHeader {...tableinfo} />

      {orderList.some((el) => el.type === "Food") && (
        <p className="ticketType">FOOD</p>
      )}

      <FlowList
        order={order}
        flow={1}
        type="Food"
        clickCrossItem={clickCrossItem}
      />

      {orderList.some((el) => el.flow === 2 && el.type === "Food") && (
        <p className="ticketLine"></p>
      )}

      <FlowList
        order={order}
        flow={2}
        type="Food"
        clickCrossItem={clickCrossItem}
      />

      {orderList.some((el) => el.type === "Drink") && (
        <p className="ticketType mt-2">DRINKS</p>
      )}

      <FlowList
        order={order}
        flow={1}
        type="Drink"
        clickCrossItem={clickCrossItem}
      />

      {orderList.some((el) => el.flow === 2 && el.type === "Drink") && (
        <p className="ticketLine"></p>
      )}
      <FlowList
        order={order}
        flow={2}
        type="Drink"
        clickCrossItem={clickCrossItem}
      />

        {/* <button onClick={() => clikEditOrder(order)}>edit</button> */}
      {clikEditOrder && (
        
        <div className="kitchenTicketBtnDiv">
          <GenericButton
              text={"Edit"}
              func={clikEditOrder}
              funcArg={order}
              classAdditional={"button-59 btnEditOrder"}
            />
        </div>
      )}

      <TicketFooter {...tableinfo} {...order} />
      {/* {orderList[0]?.table && <TicketFooter {...tableinfo} />} */}
    </div>
  );
}
