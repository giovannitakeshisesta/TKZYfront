import React, { useEffect, useState } from "react";
import { getBillTotal, ordersToArray } from "../functions/Bill.functions";
import { deleteOrder } from "../functions/takeOrderCrud.functions";
import { getHolder } from "../services/Order.Service";
import BillBody from "./BillBody";
import GenericButton from "./buttons/genericButton";
import TicketFooter from "./TicketFooter";
import TicketHeader from "./TicketHeader";
import toast from "react-hot-toast";

export default function BillTotal({
  ordersSelectedTable,
  clickPaySplit,
  refreshTablesPage,
  showTablesPage,
  setSelectedTable
}) {
  const [holders, setHolders] = useState([]);
  const list = ordersToArray(ordersSelectedTable);
  const total = getBillTotal(list);
  const tableinfo = ordersSelectedTable[0].order[0];
  const onlyDay = ordersSelectedTable[0].createdAt.substring(0, 10);
  const toastMsg = (msg) => toast.success(msg);

  // When click on pay total, delete the order in the DB from orders and holders. Then reset the tablesPage.
  const clickPayTotal = () => {
    toastMsg(` Paid ${total}€ !`);
    ordersSelectedTable.forEach((element) => {
      deleteOrder(element, holders, refreshTablesPage, showTablesPage,setSelectedTable);
    });
  };

  useEffect(() => {
    getHolder()
      .then((res) => setHolders(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="billTotalMain">
      {list && (
        <div className="billTotalInner">
          <div className="billTotalTicket">
            <TicketHeader {...tableinfo} />
            <BillBody list={list} totAmount={total} />
            <TicketFooter {...tableinfo} onlyDay={onlyDay} />
          </div>
          <div className="billBtnsDiv">
            <GenericButton
              text={"Pay All"}
              func={clickPayTotal}
              classAdditional={"button-80 tableTicketBtnSize"}
            />

            <GenericButton
              text={"Split Bill"}
              func={clickPaySplit}
              classAdditional={"button-80 tableTicketBtnSize"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
