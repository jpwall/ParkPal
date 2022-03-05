import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import Nav from "./Components/Nav";
import GMap from "./Components/GMap";
import { useLoadScript } from "@react-google-maps/api";

export default function App() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	if (!isLoaded) return <div>Loading...</div>;

	return (
		<div className="App">
			<Nav />
			<GMap />
		</div>
	);
}
