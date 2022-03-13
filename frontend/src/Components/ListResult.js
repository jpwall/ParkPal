import "../Styles/App.css";
import "../Styles/BreakPoints.css";
import ParkResult from "./ParkResult";

export default function ListResult(props) {
	return (
		<div className="listResult flexb col">
			<div>
				<h2>Search Results</h2>
			</div>
			{props.parks?.map((park, index) => {
				return (
					<ParkResult
						sortie={index}
						{...park}
						selected={index == props.selected}
						setSelected={props.setSelected}
					/>
				);
			})}
		</div>
	);
}
