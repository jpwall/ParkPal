import "./Styles/App.css";
import "./Styles/BreakPoints.css";

import Search from "./Components/Search";
import SearchResult from "./Components/SearchResult";

import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

export default function App() {
	const [searchResults, setSearchResults] = useState([]);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;

	console.log("search results:", searchResults);
	let load;
	if (searchResults.length) {
		load = <SearchResult searchResults={searchResults} />;
	} else {
		load = <Search setSearchResults={setSearchResults} />;
	}

	return <div className="App">{load}</div>;
}
