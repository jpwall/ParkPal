import "./Map.css";
import "../Styles/BreakPoints.css";
//following is CRITICAL for proper functioning of map
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useState, useRef } from "react";
//docs for map https://visgl.github.io/react-map-gl/
import { Map, Marker } from "react-map-gl";

//sets use state variables of zoom lng & lat
function ParkMap() {
	const [viewport, setViewport] = useState({
		longitude: -122.303,
		latitude: 47.655,
		zoom: 12,
	});

	return (
		<Map
			// Sends decontructed viewport to set initial viewstate
			initialViewState={{
				...viewport,
			}}
			//stops users for zooming out too much
			minZoom={9}
			//stops users from zooming in too much
			maxZoom={16}
			//defualt map container
			style={{ width: 500, height: 400 }}
			mapboxAccessToken="pk.eyJ1IjoiY2Fubml6em8iLCJhIjoiY2t6eDQ5NnhwOGQ4MDJvbXpvdGNucTY5cSJ9.uuxFKeoMIOo-piRQ1yx3lw"
			mapStyle="mapbox://styles/mapbox/streets-v9">
			{/* First template marker */}
			<Marker
				longitude={-122.303}
				latitude={47.655}
				anchor="bottom"></Marker>
			{/* Second template marker */}
			<Marker
				longitude={-122.403}
				latitude={47.655}
				anchor="bottom"></Marker>
		</Map>
	);
}

export default ParkMap;
