import "./Nav.css";
import "../Styles/BreakPoints.css";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav className="Nav">
			<Link to="/ParkPage">Park Page</Link> |{" "}
			<Link to="/Search">Search Page</Link> |{" "}
			<Link to="/SearchResult">Search Result Page</Link>
		</nav>
	);
}
export default Nav;
