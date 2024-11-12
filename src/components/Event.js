// src/components/Event.js

import React, { useState } from "react";

const Event = ({ event }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  return (
    <li>
      <h2>{event.summary}</h2>          {/* Displays event title */}
      <p>{event.created}</p>            {/* Displays event creation date */}
      <p>{event.location}</p>           {/* Displays event location */}
      <button onClick={() => setDetailsVisible(!detailsVisible)}>
        {detailsVisible ? "Hide Details" : "Show Details"}
      </button>
      {detailsVisible && <p data-testid="event-details">{event.description}</p>} {/* Displays event details */}
    </li>
  );
};

export default Event;
