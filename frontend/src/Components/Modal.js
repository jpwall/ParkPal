//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";
import "../Styles/App.css";
import "../Styles/BreakPoints.css";

//my saving grace https://javascript.plainenglish.io/how-to-create-a-popup-modal-in-react-39315907998e
export const Modal = ({ warning, setWarning }) => {
	// close the modal when clicking outside the modal.
	const modalRef = useRef();
	const closeModal = (e) => {
		if (e.target === modalRef.current) {
			setWarning("");
		}
	};
	//render the modal JSX in the portal div.
	return ReactDom.createPortal(
		<div className="container" ref={modalRef} onClick={closeModal}>
			<div className="modal flexb col">
				<button onClick={() => setWarning("")}>X</button>
				<div>
					<h2>Error: </h2>
				</div>
				<div className="warning">{warning}</div>
			</div>
		</div>,
		document.getElementById("portal")
	);
};
