import React from "react";

const TicketFooter = ({ waiter, createdAt, onlyDay }) => {
  const time =
    String(Number(createdAt?.substring(11, 13)) + 2) +
    createdAt?.substring(13, 16);
  const day = createdAt?.substring(0, 10);

  return (
    <div className="ticketFooterMain">
      {createdAt ? (
        <>
          <p>waiter: {waiter}</p>
          <div className="frcb">
            <div>
              <i className="far fa-clock"></i>
              <p className="time"> {time}</p>
            </div>
            <p>{day}</p>
          </div>
        </>
      ) : (
        <div className="frcb ms-2 me-2">
          <p>waiter: {waiter}</p>
          <p>{onlyDay}</p>
        </div>
      )}
    </div>
  );
};

export default TicketFooter;
