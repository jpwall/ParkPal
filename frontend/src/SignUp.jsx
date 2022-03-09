import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef } from "react";

/*
TODO: Global backend URL (this will be api.example.com in the future)
*/

function SignUp() {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [confirm, setConfirm] = useState("");
	const [ishuman, setIshuman] = useState(null);
	const captchaRef = useRef(null);

	const onLoad = () => {
		captchaRef.current.execute();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (ishuman) {
			if (pass == confirm) {
				axios({
					method: "post",
					url: "/auth_register",
					data: {
						username: user,
						password: pass,
					},
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers":
							"Origin, X-Requested-With, Content-Type, Accept",
					},
				})
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
			} else {
				alert("Your passwords do not match");
			}
		} else {
			alert("Please complete the reCAPTCHA");
		}
	};
	return (
		<div className="flexb col">
			<form onSubmit={handleSubmit}>
				<label for="username">Username:</label>
				<input
					value={user}
					onChange={(e) => setUser(e.target.value)}
					type="text"
					id="username"
					name="username"></input>
				<label for="password">Password:</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					id="password"
					name="password"></input>
				<label for="confirm_pass">Confirm Password:</label>
				<input
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					type="password"
					id="confirm"
					name="confirm"></input>
				{pass == confirm ? <div>✅</div> : <div>❌</div>}
				<HCaptcha
					sitekey="04c36887-2836-4c0d-8467-9c13577fd631"
					onLoad={onLoad}
					onVerify={setIshuman}
					ref={captchaRef}
				/>
				<input type="submit" value="Login"></input>
			</form>
		</div>
	);
}
export default SignUp;
