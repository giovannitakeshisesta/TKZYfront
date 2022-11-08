import React, { useEffect } from "react";
import { useState } from "react";
import {
  AddSubTot,
  removeSubTot,
  getBillTotal,
} from "../functions/Bill.functions";
import {
  deleteOrder,
  updateOrderAndStay,
} from "../functions/takeOrderCrud.functions";
import { getHolder } from "../services/Order.Service";
import BillBody from "./BillBody";
import BillSplitBody from "./BillSplitBody";
import BackBtn from "./buttons/BackBtn";
import GenericButton from "./buttons/genericButton";
import TicketFooter from "./TicketFooter";
import TicketHeader from "./TicketHeader";
import toast from "react-hot-toast";

export default function BillSplit({
  ordersSelectedTable,
  refreshTablesPage,
  showTablesPage,
  clickBackTotBill,
  setSelectedTable
}) {
  const [subTot, setSubTot] = useState([]);
  const [renderedTot, setRenderedTot] = useState(ordersSelectedTable);
  const [holders, setHolders] = useState([]);
  const tableinfo = ordersSelectedTable[0].order[0];
  const onlyDay = ordersSelectedTable[0].createdAt.substring(0, 10);
  const subTotalAmount = getBillTotal(subTot);

  // Update the quantity in both columns when clicking on "+"
  const clickAddSubTot = (item, orderId) => {
    AddSubTot(renderedTot, setRenderedTot, subTot, setSubTot, item, orderId);
  };

  // Update the quantity in both columns when clicking on "-"
  const clickRemoveSubTot = (item, orderSourceId) => {
    removeSubTot(
      ordersSelectedTable,
      subTot,
      setSubTot,
      renderedTot,
      setRenderedTot,
      item,
      orderSourceId
    );
  };

  // When click on pay split, for each order, 
  // if there are still some items, update the order quantity.
  // Otherwise delete the order in the DB from orders and holders. 
  // If the are still orders for the same table, stay in the page
  // otherwise reset the tablesPage.
  const toastMsg = (msg) => toast.success(msg);
  const clickPaySplit = () => {
    toastMsg(` Paid ${subTotalAmount}€ !`);
    renderedTot.map((order) => {
      if (order.order.some((item) => item.quantity > 0)) {
        return updateOrderAndStay(
          order,
          order.order,
          setSubTot,
          refreshTablesPage
        );
      } else {
        return deleteOrder(order, holders, refreshTablesPage, showTablesPage,setSelectedTable);
      }
    });
  };

  useEffect(() => {
    getHolder()
      .then((res) => setHolders(res))
      .catch((err) => console.log(err));
  }, []);

  //------------------------------------------------
  return (
    <div className="billSplitMain">
      {/* <h2 className="center">Split the Bill</h2> */}
      <BackBtn func={()=>clickBackTotBill(tableinfo.table)}/>
      <div className="billSplitInner">
        {/* ------------------- LEFT COLUMN ------------------ */}
        <div className="billSplitCol">
          <TicketHeader {...tableinfo} />
          <div className="billSplitLeftBody">
            {renderedTot && (
              <BillSplitBody
                renderedTot={renderedTot}
                clickAddSubTot={clickAddSubTot}
                clickRemoveSubTot={clickRemoveSubTot}
              />
            )}
          </div>
          <TicketFooter {...tableinfo} onlyDay={onlyDay} />
        </div>

        {/* ------------------- RIGHT COLUMN ------------------ */}
        <div className="billSplitCol">
          <TicketHeader {...tableinfo} />
          <BillBody list={subTot} totAmount={subTotalAmount} />
          <TicketFooter {...tableinfo} onlyDay={onlyDay} />

          <div className="billSplitBtnDiv">
            <GenericButton
              text={"Pay"}
              func={clickPaySplit}
              classAdditional={"button-80 billSplitBtnSize"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
