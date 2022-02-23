import "./Map.css";
import "../Styles/BreakPoints.css";

import React, { useState, useRef } from "react";
//docs for map https://visgl.github.io/react-map-gl/
//yt doc https://www.youtube.com/watch?v=3HYvbP2pQRA
//acc https://account.mapbox.com/access-tokens/
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
	//setup map
	const [viewport, setViewport] = useState({
		lat: 47.655,
		lng: -122.303,
		width: "1000px",
		height: "1000px",
		zoom: 12,
	});

	const mapRef = useRef();

	return (
		<ReactMapGl
			//the ... destructures viewport passing args individually
			{...viewport}
			minZoom={9}
			maxZoom={16}
			mapboxAccessToken="pk.eyJ1IjoiY2Fubml6em8iLCJhIjoiY2t6eDQ5NnhwOGQ4MDJvbXpvdGNucTY5cSJ9.uuxFKeoMIOo-piRQ1yx3lw"
			onViewportChange={(newviewport) => {
				setViewport({ ...newviewport });
			}}></ReactMapGl>
	);
}
export default Map;
