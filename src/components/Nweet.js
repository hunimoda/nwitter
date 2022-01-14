import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import classes from "./Nweet.module.css";

const Nweet = ({ nweet, isOwner }) => {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweet.text);

	useEffect(() => {
		setEditing(false);
	}, [nweet.text]);

	const wasEdited = Boolean(nweet.editedAt);
	const date = new Date(wasEdited ? nweet.editedAt : nweet.createdAt);
	date.setHours(date.getHours() + 9);

	const dateString = date.toISOString().replace("T", " ").substring(0, 19);

	const onDeleteClick = async () => {
		const isOkToDelete = window.confirm(
			"Do you really want to delete this nweet?"
		);

		if (isOkToDelete) {
			await dbService.doc(`nweets/${nweet.id}`).delete();
			if (nweet.imageURL) {
				await storageService.refFromURL(nweet.imageURL).delete();
			}
		}
	};

	const toggleEditing = () => {
		setNewNweet(nweet.text);
		setEditing((editing) => !editing);
	};

	const adjustTextAreaHeight = (target) => {
		target.style.height = "0px";
		target.style.height = `${target.scrollHeight}px`;
	};

	const onNweetFocus = (event) => {
		const { target } = event;
		const length = target.value.length;

		adjustTextAreaHeight(target);
		target.setSelectionRange(length, length);
	};

	const onNweetChange = (event) => {
		const { target } = event;

		adjustTextAreaHeight(target);
		if (target.value.length <= 120) {
			setNewNweet(target.value);
		}
	};

	const onNweetSubmit = async (event) => {
		event.preventDefault();
		await dbService.doc(`nweets/${nweet.id}`).update({
			text: newNweet,
			editedAt: Date.now(),
		});
	};

	return (
		<div className={classes.container}>
			{isOwner && !editing && (
				<div className={classes.controlButtons}>
					<button onClick={onDeleteClick}>
						<i className={`far fa-trash-alt ${classes.trash}`} />
					</button>
					<button onClick={toggleEditing}>
						<i className={`fas fa-pencil-alt ${classes.edit}`} />
					</button>
				</div>
			)}
			{editing ? (
				<form onSubmit={onNweetSubmit} className={classes.editForm}>
					<div className={classes.editControls}>
						<button type="button" onClick={toggleEditing}>
							Cancel
						</button>
						<button>Update</button>
					</div>
					<textarea
						value={newNweet}
						onChange={onNweetChange}
						onFocus={onNweetFocus}
						placeholder="Edit your nweet!"
						className={classes.editText}
						maxLength={120}
						autoFocus
						required
					/>
				</form>
			) : (
				<>
					<p className={classes.nweetText}>{nweet.text}</p>
					{nweet.image && (
						<img
							src={nweet.image}
							alt="invalid"
							width="250px"
							className={classes.nweetImage}
						/>
					)}
					<p className={classes.date}>
						{wasEdited ? "Edited at" : "Created at"} {dateString}
					</p>
				</>
			)}
		</div>
	);
};

export default Nweet;
