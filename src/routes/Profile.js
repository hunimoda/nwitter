import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Nweet from "../components/Nweet";
import { authService, dbService } from "../fbase";
import classes from "./Profile.module.css";

const Profile = ({ userObject, refreshUser }) => {
	const history = useHistory();

	const [displayName, setDisplayName] = useState(userObject.displayName);
	const [nweets, setNweets] = useState([]);

	const onLogoutClick = () => {
		authService.signOut();
		history.push("/");
	};

	useEffect(() => {
		(async () => {
			await dbService
				.collection("nweets")
				.where("creatorID", "==", userObject.uid)
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					const dbNweets = [];

					snapshot.docs.forEach((doc) => {
						dbNweets.push({ id: doc.id, ...doc.data() });
					});
					setNweets(dbNweets);
				});
		})();
	}, [userObject.uid]);

	const onProfileSubmit = async (event) => {
		event.preventDefault();

		if (displayName !== userObject.displayName) {
			await userObject.updateProfile({ displayName });
			refreshUser();
		}
	};

	const onNameChange = (event) => setDisplayName(event.target.value);

	return (
		<>
			<form onSubmit={onProfileSubmit} className={classes.profileForm}>
				<input
					onChange={onNameChange}
					type="text"
					placeholder="Display name"
					value={displayName}
					required
				/>
				<button>Update Profile</button>
			</form>
			<div className={classes.divideBar} />
			<button onClick={onLogoutClick} className={classes.logoutButton}>
				Log Out
			</button>
			<div className={classes.myNweets}>
				<h3>My Nweets</h3>
				{nweets.length !== 0 ? (
					nweets.map((nweet) => (
						<Nweet key={nweet.id} nweet={nweet} isOwner={true} />
					))
				) : (
					<p>No nweets found</p>
				)}
			</div>
		</>
	);
};

export default Profile;
