import React, { useState } from "react";
import { authService } from "../fbase";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [newAccount, setNewAccount] = useState(true);

	const onAuthSubmit = async (event) => {
		event.preventDefault();

		try {
			let data;
			if (newAccount) {
				data = await authService.createUserWithEmailAndPassword(
					email,
					password
				);
			} else {
				data = await authService.signInWithEmailAndPassword(email, password);
			}
			console.log(data);
		} catch (error) {
			setError(error.message);
		}
	};

	const onInputChange = (event) => {
		const {
			target: { name, value },
		} = event;

		switch (name) {
			case "email":
				setEmail(value);
				break;
			case "password":
				setPassword(value);
				break;
			default:
		}
	};

	const onToggleAccountClick = () => setNewAccount((prev) => !prev);

	return (
		<>
			<form onSubmit={onAuthSubmit} className={classes.authForm}>
				<i className="fab fa-twitter" />
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={onInputChange}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={onInputChange}
				/>
				<button>{newAccount ? "Create Account" : "Log In"}</button>
				<p className={classes.error}>{error}</p>
			</form>
			<span onClick={onToggleAccountClick} className={classes.toggle}>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
		</>
	);
};

export default AuthForm;
