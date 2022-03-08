import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//Router Docs at
//https://reactrouter.com/docs/en/v6/getting-started/tutorial
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./Components/Nav";
import ParkPage from "./ParkPage";
import Login from "./Login";
import SignUp from "./SignUp";
import Search from "./Search";
import SearchResult from "./SearchResult";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Nav />
			<Routes>
				<Route path="/" element={<Search />} />
				<Route path="ParkPage" element={<ParkPage />} />
				<Route path="/SearchResult" element={<SearchResult />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
