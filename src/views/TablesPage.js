import React, { useEffect, useState } from "react";
import { getHolder } from "../services/Order.Service";
import TableTicket from "../components/TableTicket";
import TakeOrder from "../components/TakeOrder";
import TablesRow from "./TablesRow";
import BillTotal from "../components/BillTotal";
import BillSplit from "../components/BillSplit";
import waiter from '../assets/waiter.png'


export default function TablesPage() {
  const tablesQty = 10;
  const [selectedTable, setSelectedTable] = useState(false);
  const [showTakeOrder, setShowTakeOrder] = useState(false);
  const [showTableTicket, setShowTableTicket] = useState(false);
  const [showBillTotal, setShowBillTotal] = useState(false);
  const [showBillSplit, setShowBillSplit] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState();
  const [ordersSelectedTable, setOrdersSelectedTable] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [occupiedTables, setOccupiedTables] = useState([]);
  const [holders, setHolders] = useState([]);
  const isOccupied = (clickedTable) => occupiedTables.includes(clickedTable);

  const clickTable = (tabNum) => {
    setShowBillSplit(false)
    setShowBillTotal(false);
    setOrderToEdit();
    setSelectedTable(tabNum);

    if (isOccupied(tabNum)) {
      setShowTakeOrder(false);
      setOrdersSelectedTable(
        allOrders.filter((el) => el.order[0]?.table === tabNum)
        .sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
      setShowTableTicket(true);
    } else {
      setShowTableTicket(false);
      setShowBillTotal(false);
      setShowTakeOrder(true);
    }
  };

  const clikEditOrder = (order) => {
    setShowTableTicket(false);
    setShowBillTotal(false);
    setShowTakeOrder(true);
    setOrderToEdit(order);
  };

  const clickAddOrder = () => {
    setShowTableTicket(false);
    setShowBillTotal(false);
    setShowTakeOrder(true);
  }

  const clickShowBillTotal = () => {
    setShowTableTicket(false);
    setShowTakeOrder(false);
    setShowBillSplit(false)
    setShowBillTotal(true);
  }

  const clickPaySplit = () => {
    setShowTableTicket(false);
    setShowTakeOrder(false);
    setShowBillTotal(false);
    setShowBillSplit(true)
  }

  const showTablesPage = () => {
    setShowBillTotal(false);
    setShowBillSplit(false);
    setShowTakeOrder(false);
  }

  const refreshTablesPage = () => {
    getHolder()
    .then((res) => {
      const { New, First, Second, Done } = res[0];
      const allOrd = [...New, ...First, ...Second, ...Done];
      setOccupiedTables(allOrd.map((el) => el.order[0]?.table));
      setAllOrders(allOrd);
      setHolders(res);
    })
    .catch((err) => console.log(err));
  }

  const clickBackTotBill = (tabNum) => {
    clickTable(tabNum)
    clickShowBillTotal()
  }

  useEffect(() => {
    refreshTablesPage()
  }, []);

  return (
    <div className="tablesPageMain" >
      <TablesRow
        tablesQty={tablesQty}
        clickTable={clickTable}
        isOccupied={isOccupied}
        selectedTable={selectedTable}
      />
      <div className="tablesPagecentralSection" style={{backgroundImage: `url(${waiter})`}}>
        {showTakeOrder && (
          <TakeOrder 
            selectedTable={selectedTable} 
            orderToEdit={orderToEdit} 
            holders={holders}
            refreshTablesPage={refreshTablesPage}
            showTablesPage={showTablesPage}
          />
        )}
        {showTableTicket && (
          <TableTicket
            ordersSelectedTable={ordersSelectedTable}
            clikEditOrder={clikEditOrder}
            clickAddOrder={clickAddOrder}
            clickShowBillTotal={clickShowBillTotal}
          />
        )}
        {showBillTotal &&
          <BillTotal 
            ordersSelectedTable={ordersSelectedTable}
            clickPaySplit={clickPaySplit}
            refreshTablesPage={refreshTablesPage}
            showTablesPage={showTablesPage}
            setSelectedTable = {setSelectedTable}
          />
        }

        {showBillSplit &&
          <BillSplit 
            ordersSelectedTable={ordersSelectedTable}
            clickBackTotBill={clickBackTotBill}
            refreshTablesPage={refreshTablesPage}
            showTablesPage={showTablesPage}
            setSelectedTable = {setSelectedTable}
          />
        }
      </div>
    </div>
  );
}
