import { useState } from "react";

import "../Styles/App.css";
import "../Styles/BreakPoints.css";

import Renamer from "./Renamer";
export default function SearchFeature(props) {
	// console.log(props);

	//all the feature avaliable to search from
	const featureList = props.allFeatures;

	//the feature list the user picked
	const [picked, setPicked] = useState([]);
	//the list of all the features
	const [pool, setPool] = useState(featureList);

	//handles the event when user clicks a item in pool
	const handleRemovePool = (feature) => {
		// console.log(feature.name);
		setPool(pool.filter((item) => item.name !== feature.name));
		setPicked([...picked, feature]);
	};
	//handles the event when user clicks a item in picked
	const handleRemovePicked = (feature) => {
		setPicked(picked.filter((item) => item.name !== feature.name));
		setPool([...pool, feature]);
	};
	// console.log(pool);

	//submits a search for all the features the user picked
	function send() {
		//list of matched parks
		let matches = [];

		//if user picked features
		if (picked.length) {
			//make an array with every fid from picked
			let wantedfids = [];
			picked.map((feature) => {
				wantedfids.push(feature.fid);
			});

			//iterate through all parks
			props.allParks.map((park) => {
				//function to check if every element in wantedfid is in park features
				const checker = wantedfids.every((fid) => {
					return park.fids.includes(fid);
				});
				//if checker returns true add park to matches
				if (checker) {
					matches.push(park);
				}
			});

			//if we get matches
			if (matches.length) {
				//Rename and clean features
				matches = Renamer(matches, props.allFeatures);
				props.setSearchResults({
					selected: 0,
					searchResults: matches,
				});
			} else {
				props.setWarning(`No parks found with that feature combination`);
			}
		} else {
			props.setWarning(`Please select some features`);
		}
	}

	//returned html
	return (
		<div>
			<button className="button enter" onClick={() => send()}>
				Search
			</button>
			<div className="picked">
				{picked.map((feature) => (
					<div
						className="pickedFeature"
						name={feature.name}
						key={feature.name}
						onClick={() => handleRemovePicked(feature)}
						style={{
							color: "white",
							border: "solid gray",
							margin: "0.3rem",
							cursor: "pointer",
						}}>
						{feature.name} Picked!
					</div>
				))}
			</div>
			<div className="pool">
				{pool.map((feature) => (
					<div
						className="poolFeature"
						key={feature.name}
						name={feature.name}
						onClick={() => handleRemovePool(feature)}
						style={{
							color: "white",
							border: "solid gray",
							margin: "0.3rem",
							cursor: "pointer",
						}}>
						{feature.name}
					</div>
				))}
			</div>
		</div>
	);
}
