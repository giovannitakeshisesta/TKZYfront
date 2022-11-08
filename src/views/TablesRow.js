import React from "react";
import TableRowBtn from "../components/buttons/TableRowBtn";

export default function TablesRow({
  tablesQty,
  clickTable,
  isOccupied,
  selectedTable,
}) {
  return (
    <div className="tablesPageBtnSection">
      {[...Array(tablesQty)].map((x, tableNum) => {
        return (
          <div className="tableRowBtnDiv" key={tableNum}>
            <TableRowBtn
              clickTable={clickTable}
              isOccupied={isOccupied}
              selectedTable={selectedTable}
              tableNum={tableNum}
            />
          </div>
        );
      })}
    </div>
  );
}
