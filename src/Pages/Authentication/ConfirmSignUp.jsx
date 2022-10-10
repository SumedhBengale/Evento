import React from "react";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import { Button } from "flowbite-react";

function ConfirmSignUp() {
  const [code, setCode] = useState(0);
  const location = useLocation();
  const email = location.state.username;
  function verifyUser() {
    console.log(email);
    try {
      Auth.confirmSignUp(email, code);
    } catch (error) {
      console.log("error confirming sign up", error);
    } finally {
      console.log("Email Verified");
    }
  }
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="text-3xl pt-10 text-center">
        An email has been sent to you, please enter the verification code
      </div>
      <div className="grid grid-cols-1 justify-items-center pt-5 gap-5">
        <input
          placeholder="Verification Code"
          className=" max-w-lg appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
          onChange={(e) => setCode(e.target.value)}
          type="number"
          required
        />
        <Button onClick={verifyUser}>Verify</Button>
      </div>
    </>
  );
}

export default ConfirmSignUp;
