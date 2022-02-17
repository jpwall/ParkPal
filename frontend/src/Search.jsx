import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";

function Search() {
	return (
		<div className="flexb col">
			<Nav />
			<div className="search">Search</div>
			<div className="parkWeek">Park of the week</div>
		</div>
	);
}
export default Search;