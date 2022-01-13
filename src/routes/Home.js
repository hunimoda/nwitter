import { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = () => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		(async () => {
			const nweetCollection = await dbService.collection("nweets").get();
			const dbNweets = [];

			nweetCollection.forEach((document) => {
				const nweetObject = {
					...document.data(),
					id: document.id,
				};
				dbNweets.push(nweetObject);
			});

			setNweets(dbNweets);
		})();
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.collection("nweets").add({
			nweet,
			createdAt: Date.now(),
		});
		setNweet("");
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;

		setNweet(value);
		console.log(value);
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
					<div key={nweet.id}>
						<h4>{nweet.nweet}</h4>
						<span>{nweet.createdAt}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
