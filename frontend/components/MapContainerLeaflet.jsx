"use client";
// import "../app/global.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { ZoomControl } from "react-leaflet/ZoomControl";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useState, useEffect } from "react";
import { useMapEvents } from "react-leaflet/hooks";
import { Icon, divIcon, point } from "leaflet";
import api from "../api";

// create custom icon
const customIcon = new Icon({
  iconUrl:
    "https://res.cloudinary.com/djwss5pl9/image/upload/v1717792325/game-icons--food-truck_1_eoqmcj.svg",
  // iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38], // size of the icon
});

const customIconCurrent = new Icon({
  iconUrl:
    "https://res.cloudinary.com/djwss5pl9/image/upload/v1717792504/mdi--location_sxq2rt.svg",
  // iconUrl: require("./icons/placeholder.png"),
  iconSize: [40, 40], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const MapContainerLeaflet = ({ setShowDetails, setTruck, position_ }) => {
  const [markers, setMarkers] = useState([]);
  // const [position, setPosition] = useState(position_);
  const [map, setMap] = useState();

  // function LocationMarker() {
  //   const map = useMapEvents({
  //     // click() {
  //     //   map.locate();
  //     // },
  //     locationfound() {
  //       map.flyTo(position, map.getZoom());
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={position} icon={customIconCurrent}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   );
  // }
  // position = [48.864716, 2.349014]
  // function FlyToButton() {
  //   const onClick = () => map?.flyTo(map?.locate(), 13);

  //   return (
  //     <button
  //       onClick={onClick}
  //       className="absolute top-5 left-80 bg-black text-white text-md py-2 px-3 rounded-2xl z-40"
  //     >
  //       <div className="flex items-center gap-2">
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="1.2em"
  //           height="1.2em"
  //           viewBox="0 0 32 32"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
  //           />
  //           <path
  //             fill="currentColor"
  //             d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
  //           />
  //         </svg>
  //         <p>Get my current location</p>
  //       </div>
  //     </button>
  //   );
  // }
  const handleLocationFound = (e) => {
    // setPosition(e.latlng);
    map.flyTo(e.latlng, map.getZoom());
  };

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latlng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          handleLocationFound({ latlng });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert(
            "Unable to retrieve your location. Please check your browser settings and permissions."
          );
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. Please try a different browser."
      );
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}/get-all-food-trucks/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add your custom headers here
            // For example:
            // 'Authorization': 'Bearer <your_token>'
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      await setMarkers(data);
    } catch (e) {
      console.error("Error", e);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen relative">
      <div>
        <button
          onClick={handleButtonClick}
          className="absolute top-5 left-80 bg-black text-white text-md py-2 px-3 rounded-2xl z-40"
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M16 18a5 5 0 1 1 5-5a5.006 5.006 0 0 1-5 5m0-8a3 3 0 1 0 3 3a3.003 3.003 0 0 0-3-3"
              />
              <path
                fill="currentColor"
                d="m16 30l-8.436-9.949a35 35 0 0 1-.348-.451A10.9 10.9 0 0 1 5 13a11 11 0 0 1 22 0a10.9 10.9 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447ZM8.813 18.395s.233.308.286.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.9 8.9 0 0 0 25 13a9 9 0 1 0-18 0a8.9 8.9 0 0 0 1.813 5.395"
              />
            </svg>
            <p>Get my current location</p>
          </div>
        </button>
      </div>
      <MapContainer
        center={position_ ? position_ : [37.7749, -122.4194]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={false}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" zoomInText="+" zoomOutText="-" />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers?.map((marker) => (
            <Marker
              position={[marker?.latitude, marker?.longitude]}
              icon={customIcon}
              key={marker?.locationid}
              eventHandlers={{
                click: (e) => {
                  setShowDetails(true);
                  setTruck(marker);
                },
              }}
            >
              <Popup>{marker?.applicant}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  );
};

export default MapContainerLeaflet;
