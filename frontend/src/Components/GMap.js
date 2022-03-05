import { useState, useRef, useMemo, useCallback } from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import "../Styles/BreakPoints.css";
import "../Styles/App.css";

export default function ParkMap(GMprops) {
	const mapRef = useRef();
	const center = useMemo(() => ({ lat: 47.665, lng: -122.303 }), []);
	const options = useMemo(
		() => ({
			disableDefaultUI: true,
			clickableIcons: false,
			mapId: "25ac3acdfb42c68c",
		}),
		[]
	);
	console.log("props");
	console.log(GMprops);

	// const selLat = GMprops.parks[GMprops.selKey].lat;
	// const selLon = GMprops.parks[GMprops.selKey].Lon;

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	return (
		<GoogleMap
			zoom={12}
			center={center}
			mapContainerClassName="mapContainer splitchild"
			options={options}
			onLoad={onLoad}>
			{GMprops.parks?.map((park) => (
				<Marker
					key={park.pid}
					position={{ lng: park.lat, lat: park.lon }}
					// onClick={() => {
					// 	updateLoco(key);
					// }}
				/>
			))}

			{/* <MarkerClusterer>
				{(clusterer) =>
					GMprops.parks?.map((park) => (
						<Marker
							position={{ lng: park.lat, lat: park.lon }}
							clusterer={clusterer}
						/>
					))
				}
			</MarkerClusterer> */}
		</GoogleMap>
	);
}
