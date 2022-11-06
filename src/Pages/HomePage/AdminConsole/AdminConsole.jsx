import { Auth } from "aws-amplify";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../../Components/NavigationBar/NavigationBar";
import AdminFeed from "../../Feed/AdminFeed";
import Feed from "../../Feed/Feed";

function AdminConsole() {
  const navigate = useNavigate();
  const [isAdmin, setisAdmin] = useState(null);

  useEffect(() => {
    async function checkAdmin() {
      const user = await Auth.currentAuthenticatedUser();
      var group = user.signInUserSession.idToken.payload["cognito:groups"];
      if (Object.values(group).indexOf("Admins") > -1) {
        console.log("User is an Admin");
        setisAdmin(true);
      } else {
        setisAdmin(false);
      }
    }
    checkAdmin();
  }, []);
  if (isAdmin == null) {
    return (
      <>
        <div>Please Wait</div>
      </>
    );
  } else if (isAdmin == false) {
    return (
      <>
        <div>You are not an Admin</div>
      </>
    );
  } else if (isAdmin == true) {
    return (
      <>
        <NavigationBar></NavigationBar>
        <div className="text-4xl text-center">Admin Console</div>
        <div className="m-10 flex items-center justify-center">
          <Button onClick={() => navigate("/add-event")}>Add New Event</Button>
        </div>

        <AdminFeed></AdminFeed>
      </>
    );
  }
}

export default AdminConsole;
