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
      {events == 0 || events == null ? (
        <div className="flex h-screen justify-center items-center">
          <img src="nothing.png"></img>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {Array.from({ length: Object.keys(events).length }, (_, index) => {
            return (
              <div className="lg:p-10 p-4 col-span-1">
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
