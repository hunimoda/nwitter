import { useState } from "react";
import { authService } from "../fbase";

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

	const toggleAccount = () => {
		setNewAccount((prev) => !prev);
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
				<button>Continue with Google</button>
				<button>Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
