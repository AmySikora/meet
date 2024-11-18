// src/components/Event.js

import React, { useState } from "react";

const Event = ({ event }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
   
  <li className="event">
    <h2>{event.summary}</h2>          
    <p>{event.created}</p>          
    <p>{event.location}</p>       
    <button
      className="details-btn"
      onClick={() => setDetailsVisible(!detailsVisible)}
    >
      {detailsVisible ? "Hide Details" : "Show Details"}
    </button>
    {detailsVisible && <p data-testid="event-details">{event.description}</p>} 
  </li>
  );
};

export default Event;