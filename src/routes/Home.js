import { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../fbase";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObject }) => {
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService
			.collection("nweets")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) => {
				const nweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setNweets(nweetArray);
			});
	}, []);

	return (
		<div>
			<NweetFactory userObject={userObject} />
			<div>
				{nweets.map((nweet) => (
					<Nweet
						key={nweet.id}
						nweet={nweet}
						isOwner={nweet.creatorID === userObject.uid}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
