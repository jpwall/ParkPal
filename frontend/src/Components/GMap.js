import { useEffect, useRef, useMemo, useCallback } from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import "../Styles/BreakPoints.css";
import "../Styles/App.css";

export default function ParkMap(props) {
	const mapRef = useRef();
	const center = useMemo(
		() => ({
			lat: props.parks[props.selected].lon,
			lng: props.parks[props.selected].lat,
		}),
		[]
	);
	const options = useMemo(
		() => ({
			disableDefaultUI: true,
			clickableIcons: false,
			mapId: "25ac3acdfb42c68c",
		}),
		[]
	);
	//this is gonna be a problem on null
	// console.log(props.parks);
	// console.log(props.selected);

	useEffect(
		() =>
			mapRef.current?.panTo({
				lat: props.parks[props.selected].lon,
				lng: props.parks[props.selected].lat,
			}),
		[props.selected, props.parks]
	);
	// console.log("props");
	// console.log(props);

	const onLoad = useCallback((map) => (mapRef.current = map), []);

	return (
		<GoogleMap
			zoom={12}
			center={center}
			mapContainerClassName="mapContainer"
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
