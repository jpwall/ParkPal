import ParkMap from "./Components/Map";
import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";

function SearchResult() {
	return (
		<div className="flexb col">
			<Nav />
			<div className="searchDeets">Search Details Here</div>
			<div className="flexb split">
				<div className="mapResult">
					MapResults
					<ParkMap />
				</div>
				<div className="listResult">ListResults</div>
			</div>
		</div>
	);
}
export default SearchResult;
