import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Nweet = ({ nweet, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState("");

	useEffect(() => {
		setEditing(false);
		console.log("false");
	}, [nweet.content]);

	const date = new Date(nweet.createdAt);
	date.setHours(date.getHours() + 9);

	const dateString = date.toISOString().replace("T", " ").substring(0, 19);

	const onDeleteClick = async () => {
		const isOkToDelete = window.confirm(
			"Do you really want to delete this nweet?"
		);

		if (isOkToDelete) {
			await dbService.doc(`nweets/${nweet.id}`).delete();
		}
	};

	const toggleEditing = () => {
		setNewNweet(nweet.content);
		setEditing((editing) => !editing);
	};

	const onNweetChange = (event) => {
		const {
			target: { value },
		} = event;

		setNewNweet(value);
	};

	const onNweetSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweet.id}`).update({
			content: newNweet,
			createdAt: nweet.createdAt,
			creatorID: nweet.creatorID,
		});
	};

	return (
		<div>
			{editing ? (
				<form onSubmit={onNweetSubmit}>
					<input
						type="text"
						value={newNweet}
						onChange={onNweetChange}
						placeholder="Edit your nweet!"
						required
					/>
					<button type="button" onClick={toggleEditing}>
						Cancel
					</button>
					<button>Update Nweet</button>
				</form>
			) : (
				<>
					<h4>{nweet.content}</h4>
					<span>{dateString}</span>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Nweet</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;