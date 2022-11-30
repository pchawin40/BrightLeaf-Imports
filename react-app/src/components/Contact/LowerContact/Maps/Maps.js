// src/components/Contact/LowerContact/Maps/Maps.js

// import react
import React from 'react';

// import api
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

// import css
import './Maps.css';

// style for map container
const containerStyle = {
  width: '80vw',
  height: '80vh'
}

// where to pinpoint map at center location
const center = {
  lat: 37.799102,
  lng: -122.401256
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
              zoom={20}
            />
          </>
        )
      }
    </div>
  );
};


// export default component
export default Maps;
