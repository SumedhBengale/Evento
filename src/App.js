import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
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

function App() {
  Amplify.configure(awsExports);
  return (
    <>    
    {/* <InstallPWA></InstallPWA> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='signin' element={<SignIn></SignIn>}></Route>
        <Route path='signup' element={<SignUp></SignUp>}></Route>
        <Route path='confirmSignUp' element={<ConfirmSignUp></ConfirmSignUp>}></Route>
        <Route path='admin-console' element={<AdminConsole></AdminConsole>}></Route>
        <Route path='add-event' element={<AddEvent></AddEvent>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;