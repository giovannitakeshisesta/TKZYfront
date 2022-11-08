import React from "react";

export default function BillBody({ list, totAmount }) {
  return (
    <div className="billBodyMain">
      <table className="billThead">
        <thead>
          <tr>
            <th className="billItemQty">Qty</th>
            <th className="billItemName">Name</th>
            <th className="billItemPrices ">€ x un.</th>
            <th className="billItemPrices ">€</th>
          </tr>
        </thead>
        {list.map((el,index) => {
          if (el.quantity > 0) {
            return (
              <tbody key={index}>
                <tr>
                  <td className="center ">{el.quantity}</td>
                  <td>{el.name}</td>
                  <td className="txtAlEnd">{el.price}</td>
                  <td className="txtAlEnd">{(el.price * el.quantity).toFixed(1).replace(/[.,]0$/, "")} </td>
                </tr>
              </tbody>
            );
          } else return null;
        })}
      </table>
      <b className="totalAmount">total: {totAmount.toFixed(1)} €</b>
    </div>
  );
}
