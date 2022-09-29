import { DataStore, Storage } from 'aws-amplify';
import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar';
import { Event } from '../../../models';
import { CircleF, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

function AddEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [time, setTime] = useState(null);
    const [organizer, setOrganizer] = useState("");
    const [guests, setGuests] = useState("");
    const [location, setLocation] = useState({'lat':19.0296441,'lng':73.0166434});
    const [radius, setRadius] = useState(5);
    const [map, setMap] = React.useState(null)
    const [enterInfoAlert, setenterInfoAlert] = useState(false);
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_MAPS_API
    })
    const onLoad = React.useCallback(function callback(map) {

      const bounds = new window.google.maps.LatLngBounds(location);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    const getLocation=(e)=>{
      setLocation({'lat':e.latLng.lat(),'lng':e.latLng.lng()})
      console.log(location); 
    }

    async function newEvent() {
      if(name!="" && description!="" && organizer!="" && location != null && radius>0){
      const file = poster.target.files[0];
      const ext=file.name.substring(file.name.lastIndexOf('.')+1);
      const newPost=await DataStore.save(
          new Event({
            "name": name,
            "description": description,
            "time": time,
            "extension": ext,
            "organizer": organizer,
            "guests": guests,
            "attendees": [],
            "location": location,
            "radius": radius
          }),
        );
        console.log(newPost.id);
  
        
        console.log(ext);
          try {
            await Storage.put(newPost.id.concat(".",ext), file, {
            });
          } catch (error) {
            console.log("Error uploading file: ", error);
          }
        }
        else{
          window.alert("Please enter all accurate values");
        }
      }
  return (
    <>
        <NavigationBar></NavigationBar>
        <div className='text-3xl pt-20 pl-20'>Add Event</div>
          <form className='p-20' onSubmit={(e)=>{newEvent();e.preventDefault();}}>
            <div className='grid grid-cols-2'>
              <div className='grid grid-cols-1 gap-6 w-3/4'>
                  <TextInput type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} required></TextInput>
                  <TextInput id='large' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}} required></TextInput>
                  <FileInput type='file' accept='image/*' placeholder='Poster' onChange={(e)=>{setPoster(e)}}></FileInput>
                  <TextInput type='text' placeholder='Guest' onChange={(e)=>{setGuests(e.target.value)}}></TextInput>
                  <TextInput type='text' placeholder='Organizer' onChange={(e)=>{setOrganizer(e.target.value)}} required></TextInput>
                  <TextInput type='datetime-local' placeholder='Time' onChange={(e)=>{setTime(new Date(e.target.value).toISOString())}} required></TextInput>
              </div>
            <div>
              {isLoaded?
            <>
              <GoogleMap
                  onClick={getLocation}
                  center={location}
                  zoom={10}
                  mapContainerStyle={{width: '100%',
                  height: '100%'}}
                  onLoad={onLoad}
                  onUnmount={onUnmount}>
                  <MarkerF
                    position={location}>
                  </MarkerF>
                  <CircleF
                    center={location}
                    radius={radius}>
                  </CircleF>
                </GoogleMap>
                <div className='w-1/2 pt-5'>
                  <TextInput id='rad' type='number' placeholder='Enter the Event Radius' onChange={(e)=>{setRadius(parseInt(e.target.value))}}></TextInput>
                <div className='pt-5'>
                  <Button type='submit'>Submit</Button>
                </div>
                </div>
              </>
            :<div>Loading</div>}
            </div>
          </div>
          </form>

    </>
  )
}

export default AddEvent