import { DataStore, Storage } from 'aws-amplify';
import { Button, Card, Modal } from 'flowbite-react'
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
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
    {/* <div className='w-full'>
      <div className='m-5 p-5 sm:w-full justify-center lg:w-1/2 rounded-lg bg-slate-200'>
        <div className='w-60'>
          <div>{image==null?<div>Loading</div>:<img src={image}></img>}</div>
        </div>
        <div>Name: {props.event['name']}</div>
        <div>Description: {props.event['description']}</div>
        <div>Time: {props.event['time']}</div>
        <div>Organizer: {props.event['organizer']}</div>
        <div>Guests: {props.event['guests']}</div>
      </div>
    </div> */}

      <Card class='p-20 w-1/2'>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Name: {props.event['name']}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        Description: {props.event['description']}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        Time: {props.event['time']}  </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        Organizer: {props.event['organizer']}  </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
        Guests: {props.event['guests']}  </p>
        <Button>
          Read more
          <svg
            className="ml-2 -mr-1 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
    </>
  )
}

export default EventCard