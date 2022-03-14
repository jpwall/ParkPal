import { useState } from "react";

import "../Styles/App.css";
import "../Styles/BreakPoints.css";

export default function FeatureSearch(props) {
	//all the feature avaliable to search from
	const featureList = [{ name: 1 }, { name: 2 }, { name: 3 }];

	//the feature list the user picked
	const [picked, setPicked] = useState([]);
	//the list of all the features
	const [pool, setPool] = useState(featureList);

	//submits a search for all the features the user picked
	function search() {}
	//calls search when user presses enter
	function onKeyPress(e) {
		if (e.key === "Enter") {
			search();
		}
	}

	//handles the event when user clicks a item in pool
	const handleRemovePool = (feature) => {
		// console.log(feature.name);
		setPool(pool.filter((item) => item.name !== feature.name));
		setPicked([...picked, feature]);
	};
	//handles the event when user clicks a item in picked
	const handleRemovePicked = (name) => {
		setPicked(picked.filter((feature) => feature.name !== name));
	};
	console.log(pool);

	//returned html
	return (
		<div>
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
						Yay I have been picked feature#{feature.name}
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
						hello I am feature #{feature.name}
					</div>
				))}
			</div>
		</div>
	);
}
