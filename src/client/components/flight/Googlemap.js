import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { GoogleMapsAPI } from "../../services/client-config";
import { useDispatch, useSelector } from "react-redux";
import { listOfPorts } from "../../apiCalls/ports";
import "../../assets/styles/flight/map.css";

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [setUpd] = useState(false);
  // const [location, setLocation] = useState(loc_dir)

  const dispatch = useDispatch();
  const ports = useSelector((state) => state.ports.ports);

  useEffect(() => {
    dispatch(listOfPorts());
    console.log(ports);
  }, []);

  function selectPort(port) {
    let location = localStorage.getItem("location_dir");
    if (location === "from") {
      localStorage.setItem("from_lat", port.latitude);
      localStorage.setItem("from_long", port.longitude);
      localStorage.setItem("departure_port", port.name);
    } else if (location === "to") {
      localStorage.setItem("to_lat", port.latitude);
      localStorage.setItem("to_long", port.longitude);
      localStorage.setItem("destination_port", port.name);
    }
    return () => setUpd(true);
  }

  return (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 43, lng: 13 }}>
      {ports.map((port) => (
        <Marker
          key={port.id}
          position={{ lat: port.latitude, lng: port.longitude }}
          onClick={() => {
            setSelectedLocation(port);
          }}
          // icon={{
          //     url: '../../assets/static/icons/flights/seaplane_port.svg',
          //     scaledSize: new window.google.maps.Size(25, 25)
          // }}
        />
      ))}
      {selectedLocation && (
        <InfoWindow
          className="map-info"
          position={{
            lat: selectedLocation.latitude,
            lng: selectedLocation.longitude,
          }}
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
        >
          <div>
            <h2>{selectedLocation.name}</h2>
            <button
              onClick={() =>
                selectPort({
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                  name: selectedLocation.name,
                })
              }
            >
              Select
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100%", height: "57vh" }} id="map-google">
      <WrappedMap
        googleMapURL={`//maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
