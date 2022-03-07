import "../Styles/App.css";
import "../Styles/BreakPoints.css";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<div className="flexb center">
			<div className="logo"></div>
			<nav className="Nav">
				<Link to="/ParkPage">Park Page</Link> |{" "}
				<Link to="/Search">Search Page</Link> |{" "}
				<Link to="/SearchResult">Search Result Page</Link> |{" "}
				<Link to="/login">Login</Link> |{" "}
				<Link to="/signup">Sign Up</Link>
			</nav>
		</div>
	);
}
export default Nav;
