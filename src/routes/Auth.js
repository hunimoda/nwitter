import { authService } from "../fbase";
import firebase from "firebase/app";
import AuthForm from "../components/AuthForm";

const Auth = () => {
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
		<div>
			<AuthForm />
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
