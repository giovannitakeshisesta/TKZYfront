import React from "react";
import tableIcon from '../assets/table.jpg'

export default function TicketHeader({ table, people, urgent, takeAway }) {

  return (
    <div className="ticketHeaderMain">
      {urgent && <i className="fas fa-exclamation-circle "></i>}
      <img src={tableIcon} className="tableIcon" alt="tableIcon" />
      <p className="me-3">{table}</p>
      <i className="fas fa-users "></i>
      <p>{people}</p>
      {takeAway &&  <i className="fas fa-bicycle "></i>}
    </div>
  );
}
