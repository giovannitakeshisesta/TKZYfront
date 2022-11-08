import {
  createOrder,
  deleteFromOrders,
  patchOrder,
  getOrders,
  putHolder,
} from "../services/Order.Service";

//---------------------  CREATE ORDER---------------------------

export const submitOrder = (order, navigate) => {
  createOrder({ order: order })
    .then(() => navigate("/kitchenPage"))
    .catch((err) => console.log(err));
};
//---------------------  UPDATE ORDER  ---------------------------

export const updateOrder = (orderToEdit, order, navigate) => {
  patchOrder(orderToEdit._id, order)
    .then(() => navigate("/kitchenPage"))
    .catch((err) => console.log(err));
};

//---------- UPDATE ORDER AND STAY ON SPLIT BILL -------------

export const updateOrderAndStay = (
  orderToEdit,
  order,
  setSubTot,
  refreshTablesPage
) => {
  patchOrder(orderToEdit._id, order)
    .then(() => {
      setSubTot([]);
      refreshTablesPage();
    })
    .catch((err) => console.log(err));
};

//---------------------  DELETE ORDER  ---------------------------
// delete the order from order DB
export const deleteOrder = (
  orderToEdit,
  holders,
  refreshTablesPage,
  showTablesPage,
  setSelectedTable
) => {
  deleteFromOrders(orderToEdit._id)
    .then(() =>
      deleteFromHolders(
        holders,
        orderToEdit,
        refreshTablesPage,
        showTablesPage,
        setSelectedTable
      )
    )
    .catch((err) => console.log(err));
};

// than delete the order from the holder
const deleteFromHolders = (
  holders,
  orderToEdit,
  refreshTablesPage,
  showTablesPage,
  setSelectedTable
) => {
  const table = orderToEdit.order[0].table;
  const copyAllHolders = [...Object.entries(holders[0])];
  copyAllHolders.forEach(([el, arr], index) => {
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        if (item._id === orderToEdit._id) {
          copyAllHolders[index][1] = copyAllHolders[index][1].filter(
            (el) => el._id !== orderToEdit._id
          );

          putHolder(Object.fromEntries(copyAllHolders))
            .then(() => {
              // (split mode)if there are other orders of the same table, stay on the same page
              // if there are no orders left for the table, show the tablesPage resetted
              return getOrders()
                .then((tablesWithOrders) => {
                  if (!tablesWithOrders.includes(table)) {
                    refreshTablesPage();
                    setSelectedTable();
                    showTablesPage();
                  } else {
                    refreshTablesPage();
                  }
                })
            })
            .catch((err) => console.log(err));
        }
      });
    }
  });
};
