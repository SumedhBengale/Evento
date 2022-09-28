import { DataStore, Storage } from 'aws-amplify';
import { Button, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Event } from '../../models';

function EventCard(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    useEffect(() => {
        async function getImage() {
            setImage(await Storage.get(props.event['id']+"."+props.event['extension']));
        }
        getImage();
    },[]);
    
    async function deleteEvent() {
        const modelToDelete = await DataStore.query(Event, props.event['id']);
        DataStore.delete(modelToDelete);
        Storage.remove(props.event['id']+"."+props.event['extension']);
        window.location.reload(false);
    }

  return (
    <>
    
    <div className='m-5 p-5 rounded-lg bg-slate-200'>
    <div>EventCard</div>
    <div className='w-60'>
      <div>{image==null?<div>Loading</div>:<img src={image}></img>}</div>
    </div>
    <div>Name: {props.event['name']}</div>
    <div>Description: {props.event['description']}</div>
    <div>Time: {props.event['time']}</div>
    <div>Organizer: {props.event['organizer']}</div>
    <div>Guests: {props.event['guests']}</div>

    </div>
    </>
  )
}

export default EventCard