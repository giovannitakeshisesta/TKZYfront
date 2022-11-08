import React from "react";

export default function TableRowBtn({
  clickTable,
  isOccupied,
  selectedTable,
  tableNum,
}) {
  return (
    <button
      className=" tableBtn"
      key={tableNum}
      onClick={() => clickTable(tableNum + 1)}
      style={{
        backgroundColor:
          selectedTable === tableNum + 1
            ? "red"
            : isOccupied(tableNum + 1)
            ? "lightgreen"
            : null,
      }}
    >
      {tableNum + 1}
    </button>
  );
}
