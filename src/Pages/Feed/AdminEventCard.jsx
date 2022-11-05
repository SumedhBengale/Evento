import { Auth, DataStore, Storage } from "aws-amplify";
import { Alert, Button, Card, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import certificateGeneration from "../../Components/Certificates/CertificateGeneration";
import { Event } from "../../models/index";
import UpdateEvent from "../HomePage/AdminConsole/UpdateEvent";
import { ExportJsonCsv } from "react-export-json-csv";

function AdminEventCard(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [time, setTime] = useState(null);
  const [QRVisible, setQRVisible] = useState(false);
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
  }, []);

  function clean() {
    //Cleans the Attendees JSON Array of duplicate elements.
    var uncleanArray = JSON.parse(props.event["attendees"]);

    const clean = (arr, prop) =>
      arr.reduce((accumulator, currentValue) => {
        if (!accumulator.find((obj) => obj[prop] === currentValue[prop])) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
    var cleanArray = clean(uncleanArray, "email");
    console.log(cleanArray);
    return cleanArray;
  }
  async function deleteEvent() {
    const modelToDelete = await DataStore.query(Event, props.event["id"]);
    console.log();
    DataStore.delete(modelToDelete);
    Storage.remove(props.event["id"] + "." + props.event["extension"]);
    window.location.reload(false);
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
              <Button onClick={() => deleteEvent()}>Delete</Button>
              <hr></hr>
              <Button type="button" onClick={() => setModalVisible(true)}>
                Edit
              </Button>
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
              <hr></hr>
              <Button onClick={() => certificateGeneration(props)}>
                Send Certificates
              </Button>
              <ExportJsonCsv
                headers={headers}
                items={clean()}
                fileTitle={eventTitle}
              >
                <Button>Export CSV</Button>
              </ExportJsonCsv>
              <Button onClick={() => setQRVisible(true)}>Show QR Code</Button>
              <Modal show={QRVisible} onClose={() => setQRVisible(false)}>
                <Modal.Header>Attendance QR Code</Modal.Header>
                <Modal.Body>
                  <div className="flex justify-center m-5">
                    <QRCode value={props.event["id"]}></QRCode>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
          <div className="p-2 flex bg-slate-100 rounded-lg justify-center items-center max-h-50 hover:scale-105 ease-in duration-75">
            <img src={image} />
          </div>
        </div>
      </Card>
    </>
  );
}

export default AdminEventCard;
