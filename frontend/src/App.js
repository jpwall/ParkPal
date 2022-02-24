import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import Nav from "./Components/Nav";
import ParkMap from "./Components/Map";

function App() {
	return (
		<div className="App">
			<Nav />
			<ParkMap />
		</div>
	);
}

export default App;
