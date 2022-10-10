import { DataStore } from "aws-amplify";
import React, { useEffect } from "react";
import { useState } from "react";
import { Event } from "../../models/index";
import AdminEventCard from "./AdminEventCard";
import EventCard from "./EventCard";

function AdminFeed() {
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
              <div className="p-10 col-span-8" key={index}>
                <AdminEventCard event={events[index]} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AdminFeed;
