import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import classes from "./NweetFactory.module.css";

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
		<form onSubmit={onSubmit} className={classes.nweetFactory}>
			<input
				value={nweet}
				onChange={onChange}
				type="text"
				placeholder="What's on your mind?"
				maxLength={120}
				className={classes.nweetInput}
			/>
			{!image && (
				<label htmlFor="add-photo" className={classes.addPhoto}>
					Add photos
					<i className="fas fa-plus" />
				</label>
			)}
			<input
				ref={imageInputRef}
				id="add-photo"
				type="file"
				accept="image/*"
				onChange={onImageChange}
				className={classes.imageInput}
			/>
			<button className={classes.createButton}>
				<i className="fas fa-arrow-right" />
			</button>
			{image && (
				<div>
					<img src={image} alt="invalid" className={classes.nweetImage} />
					<button onClick={onClearImageClick} className={classes.removeImage}>
						Remove <i className="fas fa-times" />
					</button>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
