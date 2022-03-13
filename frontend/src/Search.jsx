import { useState } from "react";
import ComboBox from "./Components/Autocomplete";
import { Modal } from "./Components/Modal";
import { useNavigate } from "react-router-dom";

import "./Styles/App.css";
import "./Styles/BreakPoints.css";

function Search() {
	const [searchType, setSearchType] = useState("text");
	const [warning, setWarning] = useState("");
	const [searchResults, setSearchResults] = useState({
		selected: 0,
		searchResults: [],
	});
	let navigate = useNavigate();
	console.log("search data", searchResults);
	let searcher;
	if (searchType === "features") {
		searcher = <div></div>;
	} else if (searchType === "az") {
		searcher = <div></div>;
	} else {
		searcher = (
			<div>
				<ComboBox
					setSearchResults={setSearchResults}
					setWarning={setWarning}
				/>
			</div>
		);
	}

	// console.log(searchResults);
	// console.log(searchResults.length);
	if (searchResults.searchResults.length) {
		navigate("../SearchResult", { state: searchResults });
	}

	return (
		<div className="flexb col">
			<div id="portal"></div>
			{warning.length > 1 && (
				<Modal warning={warning} setWarning={setWarning} />
			)}
			<div className="search">
				<div className="flexb col center">
					<div>
						<h1>Find a Park</h1>
					</div>
					<div className="flexb">
						<div className="spacer">
							<p>by</p>
						</div>
						<button
							className="button searchType"
							onClick={() => setSearchType("text")}>
							Name
						</button>
						<button
							className="button searchType"
							onClick={() => setSearchType("features")}>
							Features
						</button>
						<button
							className="button searchType"
							onClick={() => setSearchType("az")}>
							{" "}
							A to Z
						</button>
					</div>
					<div>{searcher}</div>
				</div>
			</div>
			{/* <div className="parkWeek">Park of the week</div> */}
		</div>
	);
}
export default Search;
