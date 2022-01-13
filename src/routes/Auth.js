import { authService } from "../fbase";
import firebase from "firebase/app";
import AuthForm from "../components/AuthForm";
import classes from "./Auth.module.css";

const Auth = ({ className }) => {
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

		await authService.signInWithPopup(provider);
	};

	return (
		<div className={className}>
			<AuthForm />
			<div className={classes.socialAuth}>
				<button name="google" onClick={onSocialClick}>
					Continue with Google
					<i className="fab fa-google" />
				</button>
				<button name="github" onClick={onSocialClick}>
					Continue with Github
					<i className="fab fa-github" />
				</button>
			</div>
		</div>
	);
};

export default Auth;
