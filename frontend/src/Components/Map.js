import "../Styles/BreakPoints.css";
//following is CRITICAL for proper functioning of map
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useState, useEffect } from "react";
//docs for map https://visgl.github.io/react-map-gl/
import { Map, Marker } from "react-map-gl";
import axios from "axios";

//sets use state variables of zoom lng & lat
function ParkMap() {
	const [viewport, setViewport] = useState({
		longitude: -122.303,
		latitude: 47.655,
		zoom: 12,
		//stops users for zooming out too much
		minZoom: 9,
		//stops users from zooming in too much
		maxZoom: 16,
		maxPitch: 0,
		dragRotate: false,
		//defualt map container
	});
	const [data, setData] = useState([]);
	let lat = -122.303;
	let long = 47.655;
	useEffect(() => {
		axios.get("http://localhost:5000/parks").then(function (response) {
			console.log(response.data);
			setData(response.data);
		});
	}, []);
	if (data.length) {
		console.log(data[0]["lat"]);
		console.log(data[0]["lon"]);
		lat = data[0]["lat"];
		long = data[0]["lon"];
	}

	return (
		<Map
			// Sends decontructed viewport to set initial viewstate
			initialViewState={{
				...viewport,
			}}
			style={{ width: 500, height: 400 }}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			mapStyle={"mapbox://styles/mapbox/streets-v9"}>
			{/* First template marker */}
			<Marker
				longitude={lat}
				latitude={long}
				clickTolerance={5}
				anchor="bottom"></Marker>
			{data.map((park) => (
				<Marker key={park.name} latitude={park.lat} longitude={park.lon}>
					<div>Parky</div>
				</Marker>
			))}
		</Map>
	);
}

export default ParkMap;
