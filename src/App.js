import React, { useEffect } from 'react';
import { BrowserRouter,Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import ConfirmSignUp from './Pages/Authentication/ConfirmSignUp';
import HomePage from './Pages/HomePage/HomePage';
import SignIn from './Pages/Authentication/SignIn';
// import InstallPWA from './InstallPWA';
import SignUp from './Pages/Authentication/SignUp';
import AdminConsole from './Pages/HomePage/AdminConsole/AdminConsole';
import AddEvent from './Pages/HomePage/AdminConsole/AddEvent';
import awsExports from './aws-exports';
import {Amplify} from 'aws-amplify';
import Certificates from './Pages/Certificates/Certificates';
import QR from './QR';
import Offline from './Pages/Offline/Offline';
import InstallPWA from './InstallPWA';

function App() {
  Amplify.configure(awsExports);
  
  return (
    <>    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='signin' element={<SignIn></SignIn>}></Route>
        <Route path='signup' element={<SignUp></SignUp>}></Route>
        <Route path='confirmSignUp' element={<ConfirmSignUp></ConfirmSignUp>}></Route>
        <Route path='admin-console' element={<AdminConsole></AdminConsole>}></Route>
        <Route path='add-event' element={<AddEvent></AddEvent>}></Route>
        <Route path='certificates' element={<Certificates></Certificates>}></Route>
        <Route path='qr' element={<QR></QR>}></Route>
        <Route path='offline' element={<Offline></Offline>}></Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;