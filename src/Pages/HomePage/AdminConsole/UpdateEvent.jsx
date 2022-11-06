import { DataStore, Storage } from "aws-amplify";
import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import NavigationBar from "../../../Components/NavigationBar/NavigationBar";
import { Event } from "../../../models";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

function UpdateEvent(props) {
  const [name, setName] = useState(props.event["name"]);
  const [description, setDescription] = useState(props.event["description"]);
  const [poster, setPoster] = useState("");
  const [time, setTime] = useState(props.event["time"]);
  const [organizer, setOrganizer] = useState(props.event["organizer"]);
  const [guests, setGuests] = useState(props.event["guests"]);
  const [location, setLocation] = useState(props.event["location"]);
  const [radius, setRadius] = useState(props.event["radius"]);
  const [map, setMap] = React.useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBoZFGXOCwer9dv34IPMOhFqlApLBQtprs",
  });
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const getLocation = (e) => {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(location);
  };

  async function updateEvent() {
    if (
      name != "" &&
      description != "" &&
      organizer != "" &&
      location != null &&
      radius > 0
    ) {
      const file = poster.target.files[0];
      const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
      try {
        const original = await DataStore.query(Event, props.event["id"]);
        const newEvent = await DataStore.save(
          Event.copyOf(original, (updated) => {
            updated.name = name;
            updated.description = description;
            updated.time = time;
            updated.organizer = organizer;
            updated.guests = guests;
            updated.location = location;
            updated.radius = radius;
            updated.extension = ext;
          })
        );
        console.log(newEvent.id);

        console.log(ext);
        try {
          await Storage.put(newEvent.id.concat(".", ext), file, {});
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      window.alert("Please enter all accurate values");
    }
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          updateEvent();
          e.preventDefault();
        }}
      >
        <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2">
          <div className="grid lg:gap-6 gap-2">
            <TextInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            ></TextInput>
            <TextInput
              id="large"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></TextInput>
            <FileInput
              type="file"
              accept="image/*"
              placeholder="Poster"
              onChange={(e) => {
                setPoster(e);
              }}
            ></FileInput>
            <TextInput
              type="text"
              placeholder="Guest"
              value={guests}
              onChange={(e) => {
                setGuests(e.target.value);
              }}
            ></TextInput>
            <TextInput
              type="text"
              placeholder="Organizer"
              value={organizer}
              onChange={(e) => {
                setOrganizer(e.target.value);
              }}
              required
            ></TextInput>
            <TextInput
              type="datetime-local"
              placeholder="Time"
              // value={time}
              onChange={(e) => {
                setTime(new Date(e.target.value).toISOString());
              }}
              required
            ></TextInput>
            <div className="w-1/2 mt-5">
              <TextInput
                id="rad"
                type="number"
                placeholder="Radius"
                value={radius}
                onChange={(e) => {
                  setRadius(parseInt(e.target.value));
                }}
                required
              ></TextInput>
            </div>
          </div>
          <div>
            {isLoaded ? (
              <div className="lg:h-96 h-40">
                <GoogleMap
                  onClick={getLocation}
                  center={location}
                  zoom={10}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <MarkerF position={location}></MarkerF>
                  <CircleF center={location} radius={radius}></CircleF>
                </GoogleMap>
              </div>
            ) : (
              <div>Loading</div>
            )}
          </div>
          <div className="mt-5">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UpdateEvent;
