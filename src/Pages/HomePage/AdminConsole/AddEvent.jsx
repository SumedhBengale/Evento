import { DataStore, Storage } from 'aws-amplify';
import { Button, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { Event } from '../../../models';

function AddEvent() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");
    const [time, setTime] = useState(null);
    const [organizer, setOrganizer] = useState("");
    const [guests, setGuests] = useState("");    
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
            "attendees": []
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
        <div className='text-3xl text-center'>Add Event</div>
        <form onSubmit={(e)=>{newEvent();e.preventDefault();}}>
            <div className='grid grid-cols-1 gap-2 w-1/2'>
                <TextInput type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}} required></TextInput>
                <TextInput id='large' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}} required></TextInput>
                <TextInput type='file' accept='image/*' placeholder='Poster' onChange={(e)=>{setPoster(e)}}></TextInput>
                <TextInput type='text' placeholder='Guest' onChange={(e)=>{setGuests(e.target.value)}}></TextInput>
                <TextInput type='text' placeholder='Organizer' onChange={(e)=>{setOrganizer(e.target.value)}} required></TextInput>
                <TextInput type='datetime-local' placeholder='Time' onChange={(e)=>{setTime(new Date(e.target.value).toISOString())}} required></TextInput>
                <Button type='submit'>Submit</Button>
            </div>
        </form>
    </>
  )
}

export default AddEvent