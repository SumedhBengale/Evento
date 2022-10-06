import { DataStore } from 'aws-amplify';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Event } from '../../models/index';
import EventCard from './EventCard'

function Feed() {
    const [events, setEvents] = useState(null);
    useEffect(() => {
        async function fetchEvents(){
            const  _events = await DataStore.query(Event);
            setEvents(_events);
            console.log(events);
        }
        fetchEvents();
        
    },[])
    
        
    

  return (
        <>
        {events==null
        ?<div>Loading</div>
        :<div>{
            Array.from({length: Object.keys(events).length}, (_, index) => {
                return <EventCard event={events[index]} key={index} />;
              })
            }</div>
        }
        </>
  )
}

export default Feed