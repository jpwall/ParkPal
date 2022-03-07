import Nav from "./Nav";
import { useState } from "react";
import ComboBox from "./ComboBox";
import { Modal } from "./Modal";

import "../Styles/App.css";
import "../Styles/BreakPoints.css";

function Search(props) {
	const [searchType, setSearchType] = useState("text");
	const [warning, setWarning] = useState("");

	let searcher;
	if (searchType === "features") {
		searcher = <div></div>;
	} else if (searchType === "az") {
		searcher = <div></div>;
	} else {
		searcher = (
			<ComboBox
				setSearchResults={props.setSearchResults}
				setWarning={setWarning}
			/>
		);
	}

	return (
		<div className="flexb col">
			<Nav />
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
			<div className="parkWeek">Park of the week</div>
		</div>
	);
}
export default Search;