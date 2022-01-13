import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObject, setUserObject] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObject(user);
			} else {
				setIsLoggedIn(false);
				setUserObject(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
			) : (
				<p>Wait...</p>
			)}
			<footer>&copy; Nwitter {new Date().getFullYear()}</footer>
		</>
	);
}

export default App;
