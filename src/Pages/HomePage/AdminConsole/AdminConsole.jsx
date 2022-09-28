import { Button } from 'flowbite-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function AdminConsole() {
    const navigate=useNavigate();
  return (
    <>
        <div className='text-4xl text-center'>Admin Console</div>
        <Button onClick={()=>navigate('/add-event')}>Add New Event</Button>
    </>
  )
}

export default AdminConsole