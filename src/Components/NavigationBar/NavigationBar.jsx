import { Auth, DataStore } from "aws-amplify";
import { Button, Navbar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import InstallPWA from "../../InstallPWA";
import { Event } from "../../models/index";

function NavigationBar() {
  let navigate = useNavigate();

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("attributes:", user);
  }
  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="https://flowbite.com/">
          <img src="logo.png" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Terna EMS
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 gap-2">
          <Button onClick={() => navigate("/signin")}>Sign In</Button>
          <Button onClick={() => InstallPWA()}>Install PWA</Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link onClick={() => navigate("/")}>
            <div className="cursor-pointer">Home</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={() => navigate("/signup")}>
            <div className="cursor-pointer">Sign Up</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={getUserInfo}>
            <div className="cursor-pointer">Get User</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={() => navigate("/admin-console")}>
            <div className="cursor-pointer">Admin Page</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={() => navigate("/certificates")}>
            <div className="cursor-pointer">My Certificates</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={async () => await Auth.signOut()}>
            <div className="cursor-pointer">Sign Out</div>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
