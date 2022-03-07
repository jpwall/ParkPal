import { useEffect, useRef, useMemo, useCallback } from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import "../Styles/BreakPoints.css";
import "../Styles/App.css";

export default function ParkMap(props) {
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
	useEffect(
		() =>
			mapRef.current?.panTo({
				lat: props.parks[props.selected].lon,
				lng: props.parks[props.selected].lat,
			}),
		[props.selected, props.parks]
	);
	console.log("props");
	console.log(props);

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
			{props.parks?.map((park, i) => (
				<Marker
					key={i}
					position={{ lng: park.lat, lat: park.lon }}
					onClick={() => {
						props.setSelected(i);
					}}
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
