import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../fbase";
import classes from "./Nweet.module.css";
import NweetFactory from "./NweetFactory";

const Nweet = ({ nweet, isOwner, userObject }) => {
	const [editing, setEditing] = useState(false);

	const toggleEditing = () => {
		setEditing((editing) => !editing);
	};

	useEffect(() => {
		setEditing(false);
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
			if (nweet.imageURL) {
				await storageService.refFromURL(nweet.imageURL).delete();
			}
		}
	};

	return (
		<div>
			{editing ? (
				<NweetFactory userObject={userObject} nweet={nweet} mode={"update"} />
			) : (
				<>
					<h4>{nweet.content}</h4>
					{nweet.imageURL && (
						<img src={nweet.imageURL} alt="invalid" width="250px" />
					)}
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
