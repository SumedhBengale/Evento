import { DataStore } from "aws-amplify";
import React, { useEffect } from "react";
import { useState } from "react";
import { Event } from "../../models/index";
import EventCard from "./EventCard";

function Feed() {
  const [events, setEvents] = useState(null);
  useEffect(() => {
    async function fetchEvents() {
      const _events = await DataStore.query(Event);
      setEvents(_events);
      console.log(events);
    }
    fetchEvents();
  }, []);

  return (
    <>
      {events == null ? (
        <div>Loading</div>
      ) : (
        <div className="grid grid-cols-12">
          {Array.from({ length: Object.keys(events).length }, (_, index) => {
            return (
              <div className="p-10 col-span-8">
                <EventCard event={events[index]} key={index} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Feed;
