import { Auth, DataStore, Storage } from "aws-amplify";
import { Button, Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Event } from "../../models";
import QrReader from "react-qr-scanner";
import certificateGeneration from "../../Components/Certificates/CertificateGeneration";
import { useNavigate } from "react-router-dom";

const geolib = require("geolib");

function EventCard(props) {
  let navigate = useNavigate();
  const [time, setTime] = useState(null);
  const [moreInfo, setmoreInfo] = useState(false);
  const [attendVisible, setAttendVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [curLoc, setcurLoc] = useState(null);
  const [attendMessage, setAttendMessage] = useState(null);

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
      certificateGeneration(props);
    } else {
      setAttendMessage("Invalid Input.");
    }
    setAttendVisible(true);
  }

  return (
    <>
      <Card className="p-20">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => attend(props.event["location"])}
              >
                Attend
              </Button>
              <Button type="button" onClick={() => setmoreInfo(true)}>
                Read More
              </Button>
              <Button
                type="button"
                onClick={() =>
                  navigate("/qr", { state: { id: props.event["id"] } })
                }
              >
                Scan QR Code
              </Button>
            </div>
            <Modal show={attendVisible} onClose={() => setAttendVisible(false)}>
              <Modal.Header>Attendance Message</Modal.Header>
              <Modal.Body>{attendMessage}</Modal.Body>
            </Modal>
            <Modal show={moreInfo} onClose={() => setmoreInfo(false)}>
              <Modal.Header>{props.event["name"]}</Modal.Header>
              <Modal.Body>
                <div className="w-60">
                  <div>
                    {image == null ? (
                      <div>Loading</div>
                    ) : (
                      <img src={image}></img>
                    )}
                  </div>
                </div>
                <div>Description: {props.event["description"].toString()}</div>
                <div>Time: {Date(props.event["time"]).toString()}</div>
                <div>Organizer: {props.event["organizer"].toString()}</div>
                <div>Guests: {props.event["guests"].toString()}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button color="gray" onClick={() => setmoreInfo(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          <div className="p-2 flex bg-slate-100 rounded-lg justify-center items-center max-h-50 hover:scale-105 ease-in duration-75">
            <img src={image} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default EventCard;
