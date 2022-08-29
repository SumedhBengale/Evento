import './App.css';
import {BrowserRouter } from "react-router-dom";
import {Routes,Route} from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import SignUp from './Components/SignUp/SignUp';
import LandingPage from './Components/LandingPage/LandingPage';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}/>
        <Route exact path="/signIn" element={<SignIn/>}/>
        <Route exact path="/signUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;