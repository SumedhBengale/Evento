import React from "react";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";

function PageNotFound() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="flex h-screen justify-center items-center">
        <img src="404.png"></img>
      </div>
    </>
  );
}

export default PageNotFound;
