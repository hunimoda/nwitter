import { useEffect, useState, useRef } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbase";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObject }) => {
	const [nweet, setNweet] = useState("");
	const [nweets, setNweets] = useState([]);
	const [image, setImage] = useState(null);

	const imageInputRef = useRef();

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
		const fileRef = storageService.ref().child(`${userObject.uid}/${uuidv4()}`);
		const response = await fileRef.putString(image, "data_url");
		console.log(response);
		// await dbService.collection("nweets").add({
		// 	content: nweet,
		// 	createdAt: Date.now(),
		// 	creatorID: userObject.uid,
		// });
		// setNweet("");
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

		reader.onloadend = (readerEvent) =>
			setImage(readerEvent.currentTarget.result);
		reader.readAsDataURL(file);
	};

	const onClearImageClick = () => {
		setImage(null);
		imageInputRef.current.value = null;
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
				<input
					ref={imageInputRef}
					type="file"
					accept="image/*"
					onChange={onImageChange}
				/>
				<button>Nweet</button>
				{image && (
					<div>
						<img src={image} alt="invalid" width="250px" />
						<button onClick={onClearImageClick}>Cancel</button>
					</div>
				)}
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
