import { Auth, DataStore } from "aws-amplify";
import { Button, Navbar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import InstallPWA from "../../InstallPWA";
import { Event } from "../../models/index";

function NavigationBar() {
  let navigate = useNavigate();

  async function signOut() {
    await Auth.signOut();
    navigate("/signin");
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
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link onClick={() => navigate("/")}>
            <div className="cursor-pointer">Home</div>
          </Navbar.Link>
          <hr></hr>
          <Navbar.Link onClick={() => navigate("/signin")}>
            <div className="cursor-pointer">Sign In</div>
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
          <Navbar.Link onClick={signOut}>
            <div className="cursor-pointer">Sign Out</div>
          </Navbar.Link>
          <hr></hr>
          {/* <Navbar.Link> */}
          {/* <div> */}
          <InstallPWA></InstallPWA>
          {/* </div> */}
          {/* </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavigationBar;
