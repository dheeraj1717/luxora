import React from "react";
import styles from "../../../styles/styles";
import EventCard from './EventCard.jsx'

function Events() {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>Popular Events</div>
      </div>
      <div className="w-full grid">
        <EventCard/>
      </div>
    </div>
  );
}

export default Events;
