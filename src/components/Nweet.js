import React from "react";

const Nweet = ({ nweet, isOwner }) => {
	const date = new Date(nweet.createdAt);
	date.setHours(date.getHours() + 9);

	const dateString = date.toISOString().replace("T", " ").substring(0, 19);

	return (
		<div>
			<h4>{nweet.content}</h4>
			<span>{dateString}</span>
			{isOwner && (
				<>
					<button>Delete Nweet</button>
					<button>Edit Nweet</button>
				</>
			)}
		</div>
	);
};

export default Nweet;
