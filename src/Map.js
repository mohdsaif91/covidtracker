import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import { showDataMap } from "./util";

import "leaflet/dist/leaflet.css";
import "./map.css";

function Map({ casesType, center, countries, zoom }) {
  return (
    <div className="map">
      <MapContainer
        key={JSON.stringify([center.lat, center.lng])}
        center={[center.lat, center.lng]}
        zoom={zoom}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={`&copy: <a href="http://osm.org/copyright">Open Street</a>`}
        ></TileLayer>
        {showDataMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
