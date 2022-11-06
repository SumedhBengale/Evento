import QrReader from "react-qr-scanner";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Auth, DataStore } from "aws-amplify";
import { Event } from "./models";
import NavigationBar from "./Components/NavigationBar/NavigationBar";
import { Modal } from "flowbite-react";

function QR() {
  const [delay, setdelay] = useState(1000);
  const [foundFirstScan, setFoundFirstScan] = useState(false);
  const [attendMessage, setAttendMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previewStyle = {
    height: 640,
    width: 480,
  };

  useEffect(() => {
    console.log(location.state.id);
  }, []);

  async function handleScan(e) {
    if (e != null && e.text == location.state.id && !foundFirstScan) {
      setFoundFirstScan(true);
      console.log(e.text);
      const user = await Auth.currentAuthenticatedUser();
      const currentUser = {
        name: user.attributes["name"],
        middle_name: user.attributes["middle_name"],
        family_name: user.attributes["family_name"],
        email: user.attributes["email"],
      };
      console.log(currentUser);
      async function updateEvent(id) {
        const original = await DataStore.query(Event, id);
        var attendeeList = original.attendees;
        var newAttendeeList = [...JSON.parse(attendeeList), currentUser];
        console.log(newAttendeeList.length);
        await DataStore.save(
          Event.copyOf(original, (updated) => {
            updated.attendees = newAttendeeList;
          })
        );
      }
      await updateEvent(e.text);
      setAttendMessage(true);
    }
  }

  function closeScanner() {
    setAttendMessage(false);
    Navigate("/");
  }
  return (
    <>
      <NavigationBar></NavigationBar>
      <div className="text-center pt-10 text-3xl">Scan the QR Code</div>

      <div className="flex justify-center">
        <QrReader
          facingMode={"rear"}
          delay={delay}
          style={previewStyle}
          onError={(e) => console.log(e)}
          onScan={(e) => handleScan(e)}
        />
        <div>
          {attendMessage == null ? null : (
            <div>
              <Modal show={attendMessage} onClose={() => closeScanner()}>
                <Modal.Header>Attendance Message</Modal.Header>
                <Modal.Body>Your attendance has been marked</Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default QR;
