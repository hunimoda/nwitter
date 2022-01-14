import { useRef, useState } from "react";
import { dbService } from "../fbase";
import classes from "./EditNweet.module.css";

const EditNweet = ({ nweet, onCancelClick }) => {
	const [newNweet, setNewNweet] = useState(nweet.content);
	const [image, setImage] = useState(nweet.imageURL);
	const imageInputRef = useRef();

	const onNweetSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweet.id}`).update({
			content: newNweet,
		});
	};

	const onNweetChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewNweet(value);
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
		<form onSubmit={onNweetSubmit}>
			{image && (
				<>
					<img src={image} alt="invalid" width="250px" />
					<label htmlFor="replace-photo" className={classes.replacePhoto}>
						Replace photo
						<i className="fas fa-exchange-alt" />
					</label>
					<input
						ref={imageInputRef}
						id="replace-photo"
						type="file"
						accept="image/*"
						className={classes.imageInput}
						onChange={onImageChange}
					/>
					<button onClick={onClearImageClick}>Remove x</button>
				</>
			)}
			<input
				type="text"
				value={newNweet}
				onChange={onNweetChange}
				placeholder="Edit your nweet!"
				required
			/>
			<button type="button" onClick={onCancelClick}>
				Cancel
			</button>
			<button>Update Nweet</button>
		</form>
	);
};

export default EditNweet;
