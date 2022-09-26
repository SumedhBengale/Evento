import { Amplify, Auth, DataStore } from 'aws-amplify';
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from 'flowbite-react';
import { Event } from '../../models';


function HomePage() {
    let navigate=useNavigate();


    async function getUserInfo() {
      const user = await Auth.currentAuthenticatedUser();
      console.log('attributes:', user.attributes);
    }

     async function getModels() {
      const models =await DataStore.query(Event); 
      console.log(models);
    }

  return (
    <>
        <div className='text-4xl text-center'>Pages</div>
        <Button onClick={()=>navigate('/signin')}>Sign In</Button>
        <hr></hr>
        <Button onClick={()=>navigate('/signup')}>Sign Up</Button>
        <hr></hr>
        <Button onClick={getUserInfo}>Get user Attributes</Button>
        <hr></hr>
        <Button onClick={()=> navigate('/admin-console')}>Admin Console</Button>
        <hr></hr>
        <Button onClick={()=> getModels()}>Get Events</Button>

        <hr></hr>

        [...Array(10)].map(() ( 
    <div className="" key={index}> Whatever needs to be rendered repeatedly </div> 
    ) 
)
    </>
  )
}

export default HomePage