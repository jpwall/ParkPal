import "../Styles/App.css";
import "../Styles/BreakPoints.css";
export default function propsResult(props) {
	// console.log(props);
	if (props.selected) {
		return (
			<button className="parkSlide flexb col selected">
				<div>
					<h3>{props.name}</h3> id: {props.pid}
				</div>
				<div>
					Lat:{props.lon} | Lon:{props.lat}
				</div>
				<div>Hours: {props.hours}</div>
				<div className="features">Features: {props.fids}</div>
			</button>
		);
	} else {
		return (
			<button
				className="parkSlide flexb col"
				onClick={() => props.setSelected(props.sortie)}>
				<div>
					<h3>{props.name}</h3> id: {props.pid}
				</div>
				<div>
					Lat:{props.lon} | Lon:{props.lat}
				</div>
				<div>Hours: {props.hours}</div>
				<div className="features">Features: {props.fids}</div>
			</button>
		);
	}
}
