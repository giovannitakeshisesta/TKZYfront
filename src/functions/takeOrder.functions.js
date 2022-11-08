//--------------- PEOPLE ----------------------
export const editPeople = (order,setOrder,e) => {
  let newOrder = [...order];
  newOrder[0].people = Number(e);
  setOrder(newOrder);
}

//---------------TOGGLE URGENT & TAKEAWAY ----------------------
export const urgentAway = (order, setOrder,element) => {
  let newOrder = [...order];
  newOrder[0][element] = !newOrder[0][element]
  setOrder(newOrder);
}

//------------------------ ADD ITEM ----------------------------
export const addItem = (itemId, order, listArray, setOrder) => {
  const itemIndex = order.findIndex((el) => el._id === itemId);
  const addedItem = listArray.find((item) => item._id === itemId);

  if (itemIndex > -1) {
    let newOrder = [...order];
    newOrder[itemIndex].quantity += 1;
    setOrder(newOrder);
  } else {
    addedItem.quantity = 1;
    setOrder([...order, addedItem]);
  }
};

//------------------------ DELETE ITEM ----------------------------
export const deleteItem = (itemId, order, setOrder) => {
  let newOrder = [...order];
  const itemIndex = order.findIndex((el) => el._id === itemId);
  const currentQuantity = order[itemIndex]?.quantity;
  if (currentQuantity > 1) {
    newOrder[itemIndex].quantity -= 1;
    setOrder(newOrder);
  }
  if (currentQuantity === 1) {
    newOrder.splice(itemIndex, 1);
    setOrder(newOrder);
  }
};

//---------------------CHANGE FLOW ---------------------------
export const changeFlow = (itemId, flow, order, setOrder) => {
  const itemIndex = order.findIndex((item) => item._id === itemId);

  let newOrder = [...order];
  if (flow < 2) {
    newOrder[itemIndex].flow += 1;
  } else {
    newOrder[itemIndex].flow = 1;
  }
  setOrder(newOrder);
};

//--------------------- OPEN MODAL MESSAGE ---------------------------
export const openModalMsg =  (itemId, order, setmodal) => {
  const xxx = order.filter((el) => el._id === itemId)[0].message;
  setmodal({ name: "message", id: itemId, prefillMsg: xxx });
}

//--------------------- SAVE MESSAGE ---------------------------
export const saveMsg = (id, msg, order) => {
  let newOrder = [...order];
  const itemIndexInTheOrder = order.findIndex((el) => el._id === id);
  newOrder[itemIndexInTheOrder].message = msg;
};

