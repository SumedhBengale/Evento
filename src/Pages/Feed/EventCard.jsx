import { type } from '@testing-library/user-event/dist/type';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { Button, Card, Modal } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Event } from '../../models';

const geolib = require('geolib');

function EventCard(props) {
    const [time, setTime] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [curLoc, setcurLoc] = useState(null);

    
    useEffect(() => {

        async function getImage() {
          var dt = Date(props.event['time']);
          setTime(dt);
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

    async function attend(location) {
      navigator.geolocation.getCurrentPosition((position) => setcurLoc({ 'lat': position.coords.latitude, 'lng': position.coords.longitude })
      );
      const user = await Auth.currentAuthenticatedUser();
      async function updatePost(id) {
        const original = await DataStore.query(Event, id);
        const currentUser = {
          "name":user.attributes['name'],
          "middle_name":user.attributes['middle_name'],
          "family_name":user.attributes['family_name'],
          "email":user.attributes['email'],
        }
        var attendeeList = original.attendees
        var newAttendeeList = [...JSON.parse(attendeeList),currentUser]
        console.log(newAttendeeList.length)
        await DataStore.save(
          Event.copyOf(original, updated => {
            updated.attendees = newAttendeeList
          })
        );
      }

      var x=geolib.getDistance({ latitude: location.lat, longitude: location.lng }, { latitude: curLoc.lat, longitude: curLoc.lng, }, 0.5) - props.event['radius']
      if(x>=0){
        console.log("You are outside the permitted range by "+x+" meters");
      }
      else if (x<0) {
        console.log("You are within the permitted range, the attendence will be marked.")
        updatePost(props.event["id"]);

      }
      else{
        alert("Invalid Input.")
      }
    }

  return (
    <>
      <Card className='p-20 w-1/2'>
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
        <Button type='button' onClick={()=>attend(props.event['location'])}>Attend</Button>
        <Button type="button" onClick={()=>setModalVisible(true)
          }>Read More</Button>
              <Modal
              show={modalVisible}
              onClose={()=>setModalVisible(false)}
              >
              <Modal.Header>
                {props.event['name']}
              </Modal.Header>
              <Modal.Body>
              <div className='w-60'>
                <div>{image==null?<div>Loading</div>:<img src={image}></img>}</div>
              </div>
              <div>Description: {props.event['description'].toString()}</div>
              <div>Time: {Date(props.event['time']).toString()}</div>
              <div>Organizer: {props.event['organizer'].toString()}</div>
              <div>Guests: {props.event['guests'].toString()}</div>
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
        
      </Card>
    </>
  )
}

export default EventCard