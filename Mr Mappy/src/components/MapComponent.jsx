/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

//icon for current location
// const customIcon2 = new L.Icon({
//   iconUrl:"../assets/LocationMarker.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

const MapComponent = ({ handleMapClick,storedMarker }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            {
              geocode: [latitude, longitude],
              popUp: "You are here ,Lets mark!",
            },
          ]);
        },
        (error) => {
          alert(error.message);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
      

  }, []);



  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e.latlng); // Send the coordinates back to AppDrawer
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            geocode: [e.latlng.lat, e.latlng.lng],
            popUp: "Latest Activity",
          },
        ]);
      },
    });

    return null;
  };

  if (!currentPosition) {
    return <div>Loading map...</div>;
  }

 


  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
             
             <div>
             <Popup>{marker.popUp}</Popup>
             </div>
           
          </Marker>
         ))}


         {/* //previous stored markers */}
         {storedMarker.map((marker, index) => (
          <Marker key={index} position={[marker.lat,marker.lng]} icon={customIcon}>
            <Popup>{marker.type}</Popup>
          </Marker>

        ))}
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
