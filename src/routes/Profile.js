import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { authService, dbService } from "../fbase";

const Profile = ({ userObject }) => {
	const history = useHistory();

	const [displayName, setDisplayName] = useState(userObject.displayName);

	const onLogoutClick = () => {
		authService.signOut();
		history.push("/");
	};

	useEffect(() => {
		(async () => {
			const nweets = await dbService
				.collection("nweets")
				.where("creatorID", "==", userObject.uid)
				.orderBy("createdAt")
				.get();
		})();
	}, [userObject.uid]);

	const onProfileSubmit = async (event) => {
		event.preventDefault();

		if (displayName !== userObject.displayName) {
			await userObject.updateProfile({ displayName });
		}
	};

	const onNameChange = (event) => setDisplayName(event.target.value);

	return (
		<>
			<form onSubmit={onProfileSubmit}>
				<input
					onChange={onNameChange}
					type="text"
					placeholder="Display name"
					value={displayName}
				/>
				<button>Update Profile</button>
			</form>
			<button onClick={onLogoutClick}>Log Out</button>
		</>
	);
};

export default Profile;
