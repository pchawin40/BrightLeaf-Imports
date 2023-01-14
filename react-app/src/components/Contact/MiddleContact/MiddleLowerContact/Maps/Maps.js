// src/components/Contact/LowerContact/Maps/Maps.js

// import react
import React from 'react';

// import api
import { GoogleMap, Marker, useJsApiLoader, InfoBox } from '@react-google-maps/api';

// import css
import './Maps.css';

// style for map container
const containerStyle = {
  width: '100vw',
  height: '50vh',
  margin: '0',
  padding: '0',
  left: '0',
  top: '156vh',
  position: 'absolute'
}

// where to pinpoint map at center location
const center = {
  lat: 47.8759458,
  lng: -121.9021823
}

const labelLocation = {
  lat: 47.87594,
  lng: -121.90315
}

//? Maps component
const Maps = ({ apiKey }) => {

  //? isLoaded: whether API is successfully loaded
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  return (
    <div>
      {
        isLoaded && (
          // load google map if api is loaded
          <>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
            >
              {/* Marker */}
              <Marker
                position={center}
              />

              {/* Info Window */}
              <InfoBox
                position={labelLocation}
              >
                <div
                >
                  <h1>Brightleaf Imports LLC</h1>
                </div>
              </InfoBox>
            </GoogleMap>
          </>
        )
      }
    </div>
  );
};


// export default component
export default Maps;
