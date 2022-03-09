import Nav from "./Components/Nav";
import "./Styles/App.css";
import "./Styles/BreakPoints.css";
import axios from "axios";
import { useState } from "react";

/*
TODO: Global backend URL (this will be api.example.com in the future)
*/

function Login() {
	const [user, setUser] = useState("");
	const [pass, setPass] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		axios({
			method: "post",
			url: "/auth_login",
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
				<input type="submit" value="Login"></input>
			</form>
		</div>
	);
}
export default Login;
