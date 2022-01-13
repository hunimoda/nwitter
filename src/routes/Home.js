import { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService } from "../fbase";

const Home = ({ userObject }) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService.collection("nweets").onSnapshot((snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArray);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("nweets").add({
			content: nweet,
			createdAt: Date.now(),
			creatorID: userObject.uid,
		});
		setNweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNweet(value);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={nweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<button>Nweet</button>
			</form>
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
