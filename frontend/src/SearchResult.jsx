import GMap from "./Components/GMap";
import Nav from "./Components/Nav";
import ListResult from "./Components/ListResult";
import { useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Styles/App.css";
import "./Styles/BreakPoints.css";

export default function SearchResult() {
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState();

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});
	// console.log(data);

	//fetching search result
	//right now using all data
	useEffect(() => {
		axios.get("http://localhost:5000/parks").then(function (response) {
			console.log(response.data);
			setData(response.data);
		});
	}, []);

	if (!isLoaded)
		return (
			<div className="flexb col">
				<Nav />
				<div className="flexb center">loading...</div>
			</div>
		);

	return (
		<div className="flexb col">
			<Nav />
			<div className="searchDeets">
				<div className="results flexb center">
					<div>### results for _____</div>
					<button className="button filter">Filter</button>
				</div>
			</div>
			<div className="flexb split">
				<div className="splitchild">
					<GMap
						parks={[...data]}
						selected={selected}
						setSelected={setSelected}
					/>
				</div>
				<div className="splitchild">
					<ListResult
						parks={[...data]}
						selected={selected}
						setSelected={setSelected}
					/>
				</div>
			</div>
		</div>
	);
}
