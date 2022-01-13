import { useState } from "react";
import { authService } from "../fbase";
import firebase from "firebase/app";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const changeHandler = (event) => {
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

	const submitHandler = async (event) => {
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

	const toggleAccount = () => setNewAccount((prev) => !prev);

	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event;

		let provider;

		switch (name) {
			case "google":
				provider = new firebase.auth.GoogleAuthProvider();
				break;
			case "github":
				provider = new firebase.auth.GithubAuthProvider();
				break;
			default:
		}

		const data = await authService.signInWithPopup(provider);
		console.log(data);
	};

	return (
		<div>
			<form onSubmit={submitHandler}>
				<input
					name="email"
					type="email"
					placeholder="Email"
					required
					value={email}
					onChange={changeHandler}
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
					value={password}
					onChange={changeHandler}
				/>
				<button>{newAccount ? "Create Account" : "Log In"}</button>
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? "Sign In" : "Create Account"}
			</span>
			<div>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
