import React, { useEffect } from "react";
import { useState } from "react";
import { getDNDmenu } from "../services/MenuService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner/Spinner";
import TakeOrderList from "./TakeOrderList";
import TakeOrderSelectedItems from "./TakeOrderSelectedItems";
import Modal from "./Modal";

import {
  deleteOrder,
  submitOrder,
  updateOrder,
} from "../functions/takeOrderCrud.functions";
import {
  editPeople,
  urgentAway,
  addItem,
  deleteItem,
  changeFlow,
  openModalMsg,
  saveMsg,
} from "../functions/takeOrder.functions";

export default function TakeOrder({
  selectedTable,
  setSelectedTable,
  orderToEdit,
  holders,
  refreshTablesPage,
  showTablesPage,
}) {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listArray, setListArray] = useState([]);
  const [order, setOrder] = useState([]);
  const { user } = useAuthContext();
  // modals
  const [modal, setmodal] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  //-----------------  FUNCTIONS   -----------------
  const takeOrderFunctions = {
    clickUrgentAway: (element) => urgentAway(order, setOrder, element),
    clickPeople: (e) => editPeople(order, setOrder, e.target.value),
    clickAddOneItem: (itemId) => addItem(itemId, order, listArray, setOrder),
    clickDeleteOneItem: (itemId) => deleteItem(itemId, order, setOrder),
    clickChangeFlow: (itemId, flow) =>
      changeFlow(itemId, flow, order, setOrder),
    clickOpenModalDescription: (item) =>
      setmodal({ name: "description", info: item }),
    clickOpenModalMsg: (itemId) => openModalMsg(itemId, order, setmodal),
  };

  const clickSaveMsg = (id, msg) => saveMsg(id, msg, order);

  const takeOrderCrudFunctions = {
    clickSubmitOrder: () => submitOrder(order, navigate),
    clickUpdateOrder: () => updateOrder(orderToEdit, order,navigate),
    clickDeleteOrder: () =>
      deleteOrder(orderToEdit, holders, refreshTablesPage, showTablesPage,setSelectedTable)
  };

  //-----------------------  USE EFFECT ---------------
  useEffect(() => {
    getDNDmenu()
      .then((res) => {
        const { starters, main_courses, desserts, drinks } = res[0];
        setList({ starters, main_courses, desserts, drinks });
        setListArray([
          ...starters.item,
          ...main_courses.item,
          ...desserts.item,
          ...drinks.item,
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  //---------------  REFRESH WHEN TABLE CHANGES ---------------
  useEffect(() => {
    if (orderToEdit) {
      setOrder(orderToEdit.order);
    } else {
      setOrder([
        {
          table: selectedTable,
          people: 0,
          waiter: user.name,
        },
      ]);
    }
  }, [selectedTable, orderToEdit, user]);

  //------------------------------------------------
  return (
    <div className="takeOrderMain">
      {/* ------------------- LEFT COLUMN ------------------ */}
      <div className="takeOrderColumns">
        {list ? (
          <TakeOrderList
            list={list}
            order={order}
            functions={takeOrderFunctions}
            setmodal={setmodal}
            selectedAllergens={selectedAllergens}
          />
        ) : (
          <Spinner />
        )}
      </div>

      {/* ------------------- RIGHT COLUMN ------------------ */}
      <div className="takeOrderColumns">
        {order.length > 0 ? (
          <TakeOrderSelectedItems
            order={order}
            editBtn={orderToEdit}
            functions={takeOrderCrudFunctions}
          />
        ) : (
          <p>THE LIST IS EMPTY</p>
        )}
      </div>

      {/* -------------------   MODALS   ------------------ */}
      {modal && (
        <Modal
          data={modal}
          setmodal={setmodal}
          setSelectedAllergens={setSelectedAllergens}
          clickSaveMsg={clickSaveMsg}
        />
      )}
    </div>
  );
}
