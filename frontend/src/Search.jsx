import Nav from "./Components/Nav";
import { useState } from "react";

import "./Styles/App.css";
import "./Styles/BreakPoints.css";

function Search() {
	const [searchTerm, setSearchTerm] = useState("");

	function send() {
		//creates a new message object
		setSearchTerm("");
	}
	function onKeyPress(e) {
		console.log(e);
		if (e.key === "Enter") {
			send();
		}
	}

	return (
		<div className="flexb col">
			<Nav />
			<div className="search">
				<div className="flexb col center">
					<div>
						<h1>Find a Park</h1>
					</div>
					<div className="flexb">
						<div className="spacer">
							<p>by</p>
						</div>
						<button className="button searchType">Name</button>
						<button className="button searchType">Features</button>
						<button className="button searchType"> A to Z</button>
					</div>
					<div>
						<input
							className="searchBar"
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyPress={onKeyPress}
						/>
						<button className="button enter">Search</button>
					</div>
				</div>
			</div>
			<div className="parkWeek">Park of the week</div>
		</div>
	);
}
export default Search;
