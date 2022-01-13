import React from "react";
import { useHistory } from "react-router";
import { authService } from "../fbase";

const Profile = () => {
	const history = useHistory();

	const onLogoutClick = () => {
		authService.signOut();
		history.push("/");
	};

	return (
		<>
			<button onClick={onLogoutClick}>Log Out</button>
		</>
	);
};

export default Profile;
