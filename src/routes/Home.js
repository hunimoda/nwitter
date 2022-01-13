import { useState } from "react";

const Home = () => {
	const [nweet, setNweet] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();
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
		</div>
	);
};

export default Home;
