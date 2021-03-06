import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import classes from "./Router.module.css";

const AppRouter = ({ isLoggedIn, userObject, refreshUser }) => {
	return (
		<Router>
			{isLoggedIn && userObject && <Navigation userObject={userObject} />}
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home userObject={userObject} />
						</Route>
						<Route exact path="/profile">
							<Profile userObject={userObject} refreshUser={refreshUser} />
						</Route>
						<Redirect from="*" to="/" />
					</>
				) : (
					<>
						<Route exact path="/">
							<Auth className={classes.auth} />
						</Route>
						<Redirect from="*" to="/" />
					</>
				)}
			</Switch>
		</Router>
	);
};

export default AppRouter;
