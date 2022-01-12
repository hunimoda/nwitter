import { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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

	const submitHandler = (event) => {
		event.preventDefault();
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
				<button>Log In</button>
			</form>
			<div>
				<button>Continue with Google</button>
				<button>Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
