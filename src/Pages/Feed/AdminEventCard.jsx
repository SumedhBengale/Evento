import { Auth, DataStore, Storage } from "aws-amplify";
import { Alert, Button, Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import certificateGeneration from "../../Components/Certificates/CertificateGeneration";
import { Event } from "../../models/index";
import UpdateEvent from "../HomePage/AdminConsole/UpdateEvent";
import { ExportJsonCsv } from "react-export-json-csv";
import { useNavigate } from "react-router-dom";

function AdminEventCard(props) {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(null);
  const [QRVisible, setQRVisible] = useState(false);
  const [network, setNetwork] = useState(true);
  const [certificatesMessage, setCertificatesMessage] = useState(false);
  const [attendees, setAttendees] = useState(null);

  var eventTitle = props.event["name"];
  const headers = [
    {
      key: "name",
      name: "First Name",
    },
    {
      key: "middle_name",
      name: "Middle Name",
    },
    {
      key: "family_name",
      name: "Last Name",
    },
    {
      key: "email",
      name: "Email",
    },
  ];

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
    clean();
  }, []);

  function clean() {
    fetch("https://www.google.com/", {
      // Check for internet connectivity
      mode: "no-cors",
    })
      .then(() => {
        //Cleans the Attendees JSON Array of duplicate elements.

        var uncleanArray = JSON.parse(props.event["attendees"]);
        console.log(uncleanArray);
        const clean = (arr, prop) =>
          arr.reduce((accumulator, currentValue) => {
            if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
              accumulator.push(currentValue);
            }
            return accumulator;
          }, []);
        var cleanArray = clean(uncleanArray, "email");
        console.log(cleanArray);
        setAttendees(cleanArray);
      })
      .catch(() => {
        setNetwork(false);
      });
  }
  async function deleteEvent() {
    fetch("https://www.google.com/", {
      // Check for internet connectivity
      mode: "no-cors",
    })
      .then(async () => {
        const modelToDelete = await DataStore.query(Event, props.event["id"]);
        console.log();
        DataStore.delete(modelToDelete);
        Storage.remove(props.event["id"] + "." + props.event["extension"]);
        window.location.reload(false);
      })
      .catch(() => {
        setNetwork(false);
      });
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
        <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
          <div
            onClick={() => deleteEvent()}
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg h-12 flex justify-center items-center"
          >
            Delete Event
          </div>
          <div
            type="button"
            onClick={() =>
              fetch("https://www.google.com/", {
                // Check for internet connectivity
                mode: "no-cors",
              })
                .then(() => {
                  setModalVisible(true);
                })
                .catch(() => {
                  setNetwork(false);
                })
            }
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg h-12 flex justify-center items-center"
          >
            Edit Event
          </div>
          <Modal
            size="3xl"
            show={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <Modal.Header>Edit Event</Modal.Header>
            <Modal.Body>
              <div className="">
                <UpdateEvent event={props.event}></UpdateEvent>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={!network}>
            <Modal.Header>You are Offline</Modal.Header>
            <Modal.Body>Please Refresh the Page</Modal.Body>
          </Modal>
          <div
            onClick={() =>
              fetch("https://www.google.com/", {
                // Check for internet connectivity
                mode: "no-cors",
              })
                .then(() => {
                  certificateGeneration(props);
                  setCertificatesMessage(true);
                })
                .catch(() => {
                  setNetwork(false);
                })
            }
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg h-12 flex justify-center items-center"
          >
            Send Certificates
          </div>
          <ExportJsonCsv
            headers={headers}
            items={attendees}
            fileTitle={eventTitle}
          >
            <div className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg h-12 flex justify-center items-center">
              Export CSV
            </div>
          </ExportJsonCsv>
          <div
            onClick={() =>
              fetch("https://www.google.com/", {
                // Check for internet connectivity
                mode: "no-cors",
              })
                .then(() => {
                  setQRVisible(true);
                })
                .catch(() => {
                  setNetwork(false);
                })
            }
            className="bg-[#1a56db] hover:bg-[#1e429f] text-white rounded-lg h-12 flex justify-center items-center"
          >
            Show QR
          </div>
          <Modal show={QRVisible} onClose={() => setQRVisible(false)}>
            <Modal.Header>Attendance QR Code</Modal.Header>
            <Modal.Body>
              <div className="flex justify-center m-5">
                <QRCode value={props.event["id"]}></QRCode>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={certificatesMessage}
            onClose={() => setCertificatesMessage(false)}
          >
            <Modal.Header>Certificates Generated Successfully</Modal.Header>
          </Modal>
        </div>
      </Card>
    </>
  );
}

export default AdminEventCard;
