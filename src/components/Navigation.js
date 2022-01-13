import React from "react";
import { Link } from "react-router-dom";
import classes from "./Navigation.module.css";

const Navigation = ({ userObject }) => {
	return (
		<nav className={classes.globalNav}>
			<ul>
				<li>
					<Link to="/" className={classes.home}>
						<i className="fab fa-twitter" />
					</Link>
				</li>
				<li>
					<Link to="/profile" className={classes.profile}>
						<i className="fas fa-user" />
						<span>{userObject.displayName}'s Profile</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
