import React from 'react'
import { Auth } from 'aws-amplify';
import { useState } from 'react';
import {useLocation} from 'react-router-dom';


function ConfirmSignUp() {
    const[code, setCode]=useState(0);
    const location=useLocation();
    const email=location.state.username;
    function verifyUser() {
      console.log(email);
        try {
            Auth.confirmSignUp(email, code);
          } catch (error) {
              console.log('error confirming sign up', error);
          }
          finally{
            console.log("Email Verified");
          }
    }
  return (
    <>
        <div className='text-3xl text-center'>An email has been sent to you, please enter the verification code</div>
        <input placeholder='Verification Code' className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" onChange={(e)=>setCode(e.target.value)} type='number' required/>
        <button onClick={verifyUser}>Verify</button>
    </>
  )
}

export default ConfirmSignUp