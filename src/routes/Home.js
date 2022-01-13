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

	const onImageChange = (event) => {
		const {
			target: { files },
		} = event;
		const file = files[0];
		const reader = new FileReader();

		reader.onloadend = (readerEvent) => console.log(readerEvent.target.result);
		console.log("ABC");
		reader.readAsDataURL(file);
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
				<input type="file" accept="image/*" onChange={onImageChange} />
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
