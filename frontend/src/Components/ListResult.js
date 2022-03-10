import "../Styles/App.css";
import "../Styles/BreakPoints.css";
import { useEffect, useState } from "react";

export default function ListResult(props) {
	//sets state variable for selected park
	const [selectedData, setSelectedData] = useState({});
	useEffect(() => {
		setSelectedData(props.parks[props.selected]);
	}, [props.selected, props.parks]);

	let FeaturePark;
	if (selectedData === {}) {
		FeaturePark = <div></div>;
	} else {
		// console.log(selectedData);
		// FeaturePark = <div></div>;

		FeaturePark = (
			<div className="parkSlide flexb col selected">
				<div>
					<h3>{selectedData.name}</h3> id: {selectedData.pid}
				</div>
				<div>
					Lat:{selectedData.lon} | Lon:{selectedData.lat}
				</div>
				<div>Hours: {selectedData.hours}</div>
				{/*<div className="features">Features: {selectedData.fids}</div>*/}
			</div>
		);
	}

	return (
		<div className="listResult flexb col">
			<div>
				<h2>Search Results</h2>
			</div>
			{FeaturePark}
			{props.parks?.map((park, i) => {
				return (
					<button
						className="parkSlide flexb col"
						key={i}
						onClick={() => props.setSelected(i)}>
						<div>
							<h3>{park.name}</h3> id: {park.pid}
						</div>
						<div>
							Lat:{park.lat} | Lon:{park.lon}
						</div>
						<div>Hours: {park.hours}</div>
						{/*<div className="features">Features: {park.fids}</div>*/}
					</button>
				);
			})}
		</div>
	);
}
