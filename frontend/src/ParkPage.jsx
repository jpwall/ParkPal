import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import GenInfo from "./Components/GenInfo";
function ParkPage() {
	return (
		<div className="flexb col">
			<div>
				<div className="bannerPic">
					<div>pic here</div>
				</div>
				<div className="parkName">NAME HERE</div>
			</div>
			<GenInfo />
			<div className="flexb split">
				<div className="pictures">Picture Gallery</div>
				<div className="specDeets">Specific Park Details</div>
			</div>
			<div className="social">Social stuff theres a lot gonna be here</div>
		</div>
	);
}
export default ParkPage;
