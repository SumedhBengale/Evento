import React, { useEffect, useState } from "react";
import Feed from "../Feed/Feed";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(-1);
  async function isSignedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      setAuthenticated(1);
    } catch (e) {
      console.log(e);
      setAuthenticated(0);
    }
  }
  useEffect(() => {
    isSignedIn();
  }, []);

  if (authenticated == 1) {
    return (
      <>
        <NavigationBar></NavigationBar>
        <hr></hr>
        <Feed></Feed>
      </>
    );
  } else if (authenticated == 0) {
    navigate("/signin");
  } else {
    return <div>Please Wait</div>;
  }
}

export default HomePage;
