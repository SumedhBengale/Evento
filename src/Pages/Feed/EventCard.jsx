import { Auth, DataStore, Storage } from "aws-amplify";
import { Button, Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Event } from "../../models";
import certificateGeneration from "../../Components/Certificates/CertificateGeneration";
import { useNavigate } from "react-router-dom";
import CheckConnectivity from "../../Components/CheckConnectivity/CheckConnectivity";

const geolib = require("geolib");

function EventCard(props) {
  let navigate = useNavigate();
  const [time, setTime] = useState(null);
  const [moreInfo, setmoreInfo] = useState(false);
  const [attendVisible, setAttendVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [curLoc, setcurLoc] = useState(null);
  const [attendMessage, setAttendMessage] = useState(null);
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    async function getImage() {
      var date = new Date(props.event["time"]);
      setTime(
        date.getDate() +
          "-" +
          date.getMonth() +
          "-" +
          date.getFullYear() +
          " " +
          date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        500,
        540
      );
      setImage(
        await Storage.get(props.event["id"] + "." + props.event["extension"])
      );
    }
    getImage();
    navigator.geolocation.getCurrentPosition((position) =>
      setcurLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  }, []);

  async function attend(location) {
    if (CheckConnectivity) {
      const user = await Auth.currentAuthenticatedUser();
      const currentUser = {
        name: user.attributes["name"],
        middle_name: user.attributes["middle_name"],
        family_name: user.attributes["family_name"],
        email: user.attributes["email"],
      };
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

      var x =
        geolib.getDistance(
          { latitude: location.lat, longitude: location.lng },
          { latitude: curLoc.lat, longitude: curLoc.lng },
          0.5
        ) - props.event["radius"];
      if (x >= 0) {
        setAttendMessage(
          "You are outside the permitted range by " + x + " meters"
        );
      } else if (x < 0) {
        setAttendMessage(
          "You are within the permitted range, your attendence will be marked."
        );
        updateEvent(props.event["id"]);
      } else {
        setAttendMessage("Invalid Input.");
      }
      setAttendVisible(true);
    } else {
      setNetwork(false);
    }
  }

  return (
    <>
      <Card>
        <div className="p-2 flex rounded-lg justify-center items-center hover:scale-105 ease-in duration-75">
          <img src={image} className="h-64" />
        </div>
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
          Name: {props.event["name"]}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Time: {time}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Organizer: {props.event["organizer"]}{" "}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Guests: {props.event["guests"]}{" "}
        </p>
        <div className=" grid grid-cols-2 lg:grid-cols-3 gap-2">
          <div
            type="button"
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white p-5 border-5 rounded-lg h-12 flex justify-center items-center"
            onClick={() => attend(props.event["location"])}
          >
            Attend
          </div>
          <div
            type="button"
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white p-5 border-5 rounded-lg h-12 flex justify-center items-center"
            onClick={() => setmoreInfo(true)}
          >
            More
          </div>
          <div
            type="button"
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white p-5 border-5 rounded-lg h-12 flex justify-center items-center"
            onClick={() =>
              navigate("/qr", { state: { id: props.event["id"] } })
            }
          >
            Scan QR
          </div>
        </div>
        <Modal show={attendVisible} onClose={() => setAttendVisible(false)}>
          <Modal.Header>Attendance Message</Modal.Header>
          <Modal.Body>{attendMessage}</Modal.Body>
        </Modal>
        <Modal show={!network} onClose={() => setAttendVisible(false)}>
          <Modal.Header>You are Offline</Modal.Header>
          <Modal.Body>Please Refresh the Page</Modal.Body>
        </Modal>
        <Modal show={moreInfo} onClose={() => setmoreInfo(false)}>
          <Modal.Header>{props.event["name"]}</Modal.Header>
          <Modal.Body>
            <div className="w-60">
              <div>
                {image == null ? <div>Loading</div> : <img src={image}></img>}
              </div>
            </div>
            <div>
              <b>Description:</b> {props.event["description"].toString()}
            </div>
            <div>
              <b>Time:</b> {Date(props.event["time"]).toString()}
            </div>
            <div>
              <b>Organizer:</b> {props.event["organizer"].toString()}
            </div>
            <div>
              <b>Guests:</b> {props.event["guests"].toString()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setmoreInfo(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </>
  );
}

export default EventCard;
