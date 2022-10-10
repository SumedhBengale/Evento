import React from "react";
import Feed from "../Feed/Feed";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";

function HomePage() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <hr></hr>
      <Feed></Feed>
    </>
  );
}

export default HomePage;
