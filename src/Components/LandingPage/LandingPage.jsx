import React from 'react'
import {Link} from 'react-router-dom'

function LandingPage() {

  return (
    <>
        <div className='text-center text-2xl'>Landing Page</div>
        <Link to={'/signIn'}>SignIn Button</Link>
        <hr></hr>
        <Link to={'/signUp'}>SignUp Button</Link>
    </>
  )
}

export default LandingPage