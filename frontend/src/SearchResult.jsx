import GMap from "./Components/GMap";
import ListResult from "./Components/ListResult";
import { useLoadScript } from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";

import "./Styles/App.css";
import "./Styles/BreakPoints.css";

export default function SearchResult() {
	const [data, setData] = useState([]);
	const [selected, setSelected] = useState(0);

	const location = useLocation();
	console.log("raw data passed in search", location.state);

	const searchData = location.state.searchResults;
	const searchSel = location.state.selected;

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	console.log("transformed data", searchData);

	// fetching search result
	// right now using all data
	useEffect(() => {
		let searchedparks = [];
		axios.get("/parks").then(function (response) {
			// console.log(response.data);
			response.data.map((park, i) => {
				searchData.map((passedpark) => {
					if (passedpark.id == i) {
						searchedparks.push(park);
					}
				});
			});
			setData(searchedparks);
			setSelected(searchSel);
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
			<div className="results flexb center">
				<div> Park Pal found {data.length} parks!</div>
				{/* <button className="button filter">Filter</button> */}
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
