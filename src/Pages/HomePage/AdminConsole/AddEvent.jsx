import { DataStore, Storage } from 'aws-amplify';
import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import NavigationBar from '../../../Components/NavigationBar/NavigationBar';
import { Event } from '../../../models';
import { Circle, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import maps_api_key from '../../../gmaps';

function AddEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [time, setTime] = useState(null);
    const [organizer, setOrganizer] = useState("");
    const [guests, setGuests] = useState("");
    const [location, setLocation] = useState({'lat':19.0296441,'lng':73.0166434});
    const [radius, setRadius] = useState(0);
    const [map, setMap] = React.useState(null)
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: maps_api_key
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
      console.log(e.latLng.lat());
      console.log(e.latLng.lng());
      setLocation({'lat':e.latLng.lat(),'lng':e.latLng.lng()})
      
    }

    async function newEvent() {
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
  return (
    <>
        <NavigationBar></NavigationBar>
        <div className='text-3xl text-center pt-20'>Add Event</div>
          <form className='p-20' onSubmit={(e)=>{newEvent();e.preventDefault();}}>
            <div className='grid grid-cols-2'>
              <div className='grid grid-cols-1 gap-6 w-3/4'>
                  <TextInput type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} required></TextInput>
                  <TextInput id='large' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}} required></TextInput>
                  <TextInput type='file' accept='image/*' placeholder='Poster' onChange={(e)=>{setPoster(e)}}></TextInput>
                  <TextInput type='text' placeholder='Guest' onChange={(e)=>{setGuests(e.target.value)}}></TextInput>
                  <TextInput type='text' placeholder='Organizer' onChange={(e)=>{setOrganizer(e.target.value)}} required></TextInput>
                  <TextInput type='datetime-local' placeholder='Time' onChange={(e)=>{setTime(new Date(e.target.value).toISOString())}} required></TextInput>
                  <Button type='submit'>Submit</Button>
              </div>
            <div>
              {isLoaded}?
            <GoogleMap
              onClick={getLocation}
              center={location}
              zoom={20}
              onLoad={onLoad}
              onUnmount={onUnmount}>
            <Marker
              position={location}>
            </Marker>
            <Circle
              center={location}
              radius={radius}>
            </Circle>
            </GoogleMap>
            <TextInput id='rad' type='text' placeholder='Enter the Event Radius'></TextInput>
            :<div>Loading</div>
            </div>
          </div>
          </form>

    </>
  )
}

export default AddEvent