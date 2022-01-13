import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";

const NweetFactory = ({ userObject }) => {
	const [nweet, setNweet] = useState("");
	const [image, setImage] = useState(null);
	const imageInputRef = useRef();

	const onSubmit = async (event) => {
		event.preventDefault();

		const newNweet = {
			content: nweet,
			createdAt: Date.now(),
			creatorID: userObject.uid,
		};

		if (image) {
			const fileRef = storageService
				.ref()
				.child(`${userObject.uid}/${uuidv4()}`);
			const response = await fileRef.putString(image, "data_url");
			const imageURL = await response.ref.getDownloadURL();

			newNweet.imageURL = imageURL;
		}

		await dbService.collection("nweets").add(newNweet);

		setNweet("");
		onClearImageClick();
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
	);
};

export default NweetFactory;
