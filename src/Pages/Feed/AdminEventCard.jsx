import { Auth, DataStore, Storage } from 'aws-amplify';
import { Alert, Button, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Event } from '../../models';

function AdminEventCard(props) {
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
    <Button onClick={()=>deleteEvent()}>Delete</Button>
    <hr></hr>
    <Button type="button" onClick={()=>setModalVisible(true)
}>Edit</Button>
    <Modal
    show={modalVisible}
    onClose={()=>setModalVisible(false)}
  >
    <Modal.Header>
      Edit Event
    </Modal.Header>
    <Modal.Body>
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
        </p>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button
        color="gray"
        onClick={()=>setModalVisible(false)}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
    </>
  )
}

export default AdminEventCard