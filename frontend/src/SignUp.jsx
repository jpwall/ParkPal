import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState, useRef } from "react";
import { Link } from 'react-router-dom';

/*
TODO: Global backend URL (this will be api.example.com in the future)
*/

function SignUp() {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [confirm, setConfirm] = useState("");
	const [ishuman, setIshuman] = useState(null);
	const [err, setErr] = useState("");
	const captchaRef = useRef(null);

	const onLoad = () => {
		captchaRef.current.execute();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (pass == confirm) {
			if (ishuman) {
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
						// console.log(response);
						// // response.status has status code
						// // from here, do what you gotta do to load the page
						// // response will have the JWT
						return <Link to='/login'/>
					})
					.catch(function (err) {
						if (err.response.status == 409) {
							setErr("Username already taken");
						} else {
							setErr("Server error: " + err)
							//TODO: handle empty password and empty username
						}
					});
			} else {
				setErr("Please complete the reCAPTCHA to continue")
			}
		} else {
			setErr("Your passwords do not match")
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
				{ishuman === null && 
				<HCaptcha
					sitekey="04c36887-2836-4c0d-8467-9c13577fd631"
					onLoad={onLoad}
					onVerify={setIshuman}
					ref={captchaRef}
				/>}
				<div style={{color:"red"}}>{err}</div>
				<input type="submit" value="Sign Up"></input>
			</form>
			<Link to="/login">Or Log In</Link>
		</div>
	);
}
export default SignUp;
