import GMap from "./GMap";
import Nav from "./Nav";
import ListResult from "./ListResult";
import { useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import "../Styles/App.css";
import "../Styles/BreakPoints.css";

export default function SearchResult() {
	const [data, setData] = useState([]);
<<<<<<< HEAD:frontend/src/Components/SearchResult.js
	//Make sure to remove default selected value
	const [selected, setSelected] = useState(1);
=======
	const [selected, setSelected] = useState(0);

	const location = useLocation();
	const searchData = location.state;
>>>>>>> cato:frontend/src/SearchResult.jsx

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

<<<<<<< HEAD:frontend/src/Components/SearchResult.js
	//fetching search result
	//right now it uses all park data
=======
	console.log("data passed from search", searchData);
	// fetching search result
	// right now using all data
>>>>>>> cato:frontend/src/SearchResult.jsx
	useEffect(() => {
		let searchedparks = [];
		axios.get("/parks").then(function (response) {
			console.log(response.data);
			response.data.map((park, i) => {
				searchData.map((passedpark) => {
					if (passedpark.id == i) {
						searchedparks.push(park);
					}
				});
			});
			setData(searchedparks);
		});
	}, [searchData]);

	if (!isLoaded)
		return (
			<div className="flexb col">
				<div className="flexb center">loading...</div>
			</div>
		);
	else if (data.length == 0)
		return (
			<div className="flexb col">
				<div className="flexb center">
					Didn't find any results. Sorry :(
				</div>
			</div>
		);
	return (
		<div className="flexb col">
			<div className="searchDeets">
				<div className="results flexb center">
<<<<<<< HEAD:frontend/src/Components/SearchResult.js
					<div> {data.length} results for _____</div>
					<button className="button filter">Filter</button>
=======
					<div> Park Pal found {data.length} parks!</div>
					{/* <button className="button filter">Filter</button> */}
>>>>>>> cato:frontend/src/SearchResult.jsx
				</div>
			</div>
			<div className="flexb split">
				<div className="splitchild one">
					<GMap
						parks={[...data]}
						selected={selected}
						setSelected={setSelected}
					/>
				</div>
				<div className="splitchild two">
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
