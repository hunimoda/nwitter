import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import "./App.css";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObject, setUserObject] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObject({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (profile) => user.updateProfile(profile),
				});
			} else {
				setIsLoggedIn(false);
				setUserObject(null);
			}
			setInit(true);
		});
	}, []);

	const refreshUser = () => {
		const user = authService.currentUser;

		setUserObject({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (profile) => user.updateProfile(profile),
		});
	};

	return (
		<>
			{init ? (
				<AppRouter
					isLoggedIn={isLoggedIn}
					userObject={userObject}
					refreshUser={refreshUser}
				/>
			) : (
				<p>Wait...</p>
			)}
			<footer className="copyright">
				&copy; Nwitter {new Date().getFullYear()}
			</footer>
		</>
	);
}

export default App;
