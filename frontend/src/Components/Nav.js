import "../Styles/App.css";
import "../Styles/BreakPoints.css";
import { Link } from "react-router-dom";
import searchlogo from '../ImagesIcons/search.png';
import { authenticationService } from '../Helpers/authentication.service.js'

function Nav() {
	/*const logOut = () => {

	}*/
	return (
		<div className="navContainer">
			<div className="flexb center">
				<div className="logo"></div>
				<nav className="Nav">
					{/* <Link to="/ParkPage">Park Page</Link> |{" "} */}
					<Link className="searchLogoBtn" to="/Search"><img className="searchLogo" src={searchlogo}/>Search</Link>
					{/* <Link to="/SearchResult">Search Result Page</Link> |{" "}
					<Link to="/login">Login</Link> |{" "}
					<Link to="/signup">Sign Up</Link> */}
				</nav>
			</div>
		</div>
	);
}
export default Nav;
