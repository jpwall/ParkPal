import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import axios from "axios";
import { useState } from "react";
import { authenticationService } from './Helpers/authentication.service.js';
import { useNavigate } from 'react-router-dom'
import { timeInterval } from "rxjs";

function Login() {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");
	const [err, setErr] = useState("");
	let navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		authenticationService.login(user, pass)
			.then(
				user => {
					navigate('/')
				},
				error => {
					setErr(error)
					console.log(error)
				}
			)
	};
	
	return (
		<div className="flexb col">
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					value={user}
					onChange={(e) => setUser(e.target.value)}
					type="text"
					id="username"
					name="username"></input>
				<label htmlFor="password">Password:</label>
				<input
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					id="password"
					name="password"></input>
				<div style={{color:"red"}}>{err}</div>
				<input type="submit" value="Login"></input>
			</form>
		</div>
	);
}
export default Login;
