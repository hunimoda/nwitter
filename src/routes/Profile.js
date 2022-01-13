import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { authService, dbService } from "../fbase";

const Profile = ({ userObject }) => {
	const history = useHistory();

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
			console.log(nweets.docs.map((doc) => doc.data()));
		})();
	}, [userObject.uid]);

	return (
		<>
			<button onClick={onLogoutClick}>Log Out</button>
		</>
	);
};

export default Profile;
