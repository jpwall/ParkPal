import "../Styles/App.css";
import "../Styles/BreakPoints.css";

export default function ListResult(props) {
	return (
		<div className="listResult flexb col">
			<div>Search Results</div>

			{props.parks?.map((park) => {
				return (
					<div className="parkSlide flexb col">
						<div>
							<h3>{park.name}</h3> id: {park.pid}
						</div>
						<div>
							Lat:{park.lat} | Lon:{park.lon}
						</div>
						<div>Hours: {park.hours}</div>
						<div>Features: {park.fids}</div>
					</div>
				);
			})}
		</div>
	);
}
