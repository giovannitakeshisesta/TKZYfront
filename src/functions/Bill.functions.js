// ----------------- TOTAL BILL ----------------
export const ordersToArray = (ordersSelectedTable) => {
  const allItems = ordersSelectedTable.map((el) => el.order);
  const allItemsNoTable = allItems.map((el) => el.slice(1));
  const allItemsFlatten = [].concat.apply([], allItemsNoTable);
  const allItemsSorted = allItemsFlatten.sort((a, b) =>
    b.type.localeCompare(a.type)
  );

  const sumRepeatedItems = Object.values(
    allItemsSorted.reduce((acc, item) => {
      acc[item.name] = acc[item.name]
        ? { ...item, quantity: item.quantity + acc[item.name].quantity }
        : item;
      return acc;
    }, {})
  );
  return sumRepeatedItems;
};

export const getBillTotal = (list) => {
  return list.reduce(function (sum, current) {
    return sum + current.price * current.quantity;
  }, 0);
};

// ----------------- SPLIT BILL ----------------
export const AddSubTot = (
  renderedTot,
  setRenderedTot,
  subTot,
  setSubTot,
  item,
  orderId
) => {
  const copyOrder = structuredClone(renderedTot);
  const newOrder = copyOrder.find((el) => el._id === orderId);
  const newItem = newOrder.order.find((el) => el._id === item._id);
  if (newItem.quantity > 0) {
    newItem.quantity -= 1;
    setRenderedTot(copyOrder);

    const newSubTot = [...subTot];
    if (subTot.some((el) => el._id === item._id)) {
      const newItem = subTot.find((el) => el._id === item._id);
      newItem.quantity += 1;
      setSubTot(newSubTot);
    } else {
      const newItem = { ...item };

      newItem.orderSourceId = orderId;
      newItem.quantity = 1;
      setSubTot([...newSubTot, newItem]);
    }
  }
};

export const removeSubTot = (
ordersSelectedTable,
  subTot,
  setSubTot,
  renderedTot,
  setRenderedTot,
  item,
  orderSourceId
) => {
  if (subTot.some((el) => el._id === item._id)) {
    const newSubTot = [...subTot];
    const newItem = newSubTot.find((el) => el._id === item._id);
    const maxQtyOrder = ordersSelectedTable.find(
      (el) => el._id === orderSourceId
    );
    const maxQtyItem = maxQtyOrder.order.find(
      (el) => el._id === item._id
    ).quantity;

    const copyOrder = structuredClone(renderedTot);
    const newOrder = copyOrder.find((el) => el._id === orderSourceId);
    const newItem2 = newOrder.order.find((el) => el._id === item._id);

    if (newItem.quantity > 0 && newItem2.quantity < maxQtyItem) {
      newItem.quantity -= 1;
      setSubTot(newSubTot);
      newItem2.quantity += 1;
      setRenderedTot(copyOrder);
    }
  }
};
