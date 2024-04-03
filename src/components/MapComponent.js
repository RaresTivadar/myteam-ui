import React from 'react';

const MapComponent = ({ latitude, longitude}) => {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAPMq1Yof4Mr8W3z8C7NCgduED4wcJsqwU&q=${latitude},${longitude}`;
  //const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`;

  return (
    <iframe
      title="Match Location"
      src={mapUrl}
      style={mapStyles}
      allowFullScreen
    ></iframe>
  );
};

export default MapComponent;