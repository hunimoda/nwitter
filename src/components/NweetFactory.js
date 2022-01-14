import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../fbase";
import classes from "./NweetFactory.module.css";

const EMPTY_NWEET = { text: "", image: null };

const NweetFactory = ({ userObject, nweet }) => {
	const [newNweet, setNewNweet] = useState(nweet ?? EMPTY_NWEET);

	const imageInputRef = useRef();

	const onSubmit = async (event) => {
		event.preventDefault();

		if (newNweet.text === "" && newNweet.image === null) {
			window.alert("Your nweet is empty!");
			return;
		}

		const submitNweet = {
			text: newNweet.text,
			image: newNweet.image,
			createdAt: Date.now(),
			creatorId: userObject.uid,
		};

		if (newNweet.image) {
			const fileRef = storageService
				.ref()
				.child(`${userObject.uid}/${uuidv4()}`);
			const response = await fileRef.putString(newNweet.image, "data_url");
			submitNweet.image = await response.ref.getDownloadURL();
		}

		await dbService.collection("nweets").add(submitNweet);

		setNewNweet(EMPTY_NWEET);
		// onClearImageClick();
	};

	const onTextChange = (event) => {
		const {
			target: { value: text },
		} = event;

		setNewNweet((nweet) => {
			return { ...nweet, text };
		});
	};

	const onImageChange = (event) => {
		const {
			target: { files },
		} = event;
		const file = files[0];
		const reader = new FileReader();

		reader.onloadend = (readerEvent) => {
			const {
				currentTarget: { result: image },
			} = readerEvent;

			setNewNweet((nweet) => {
				return { ...nweet, image };
			});
		};
		reader.readAsDataURL(file);
	};

	const onClearImageClick = () => {
		setNewNweet((nweet) => {
			return { ...nweet, image: null };
		});
		imageInputRef.current.value = null;
	};

	return (
		<form onSubmit={onSubmit} className={classes.nweetFactory}>
			<input
				value={newNweet.text ?? ""}
				onChange={onTextChange}
				type="text"
				placeholder="What's on your mind?"
				maxLength={120}
				className={classes.nweetInput}
			/>
			{!newNweet.image && (
				<>
					<label htmlFor="add-photo" className={classes.addPhoto}>
						Add photos
						<i className="fas fa-plus" />
					</label>
				</>
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
			{newNweet.image && (
				<div>
					<img
						src={newNweet.image}
						alt="invalid"
						className={classes.nweetImage}
					/>
					<button onClick={onClearImageClick} className={classes.removeImage}>
						Remove <i className="fas fa-times" />
					</button>
				</div>
			)}
		</form>
	);
};

export default NweetFactory;
