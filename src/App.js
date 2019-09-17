import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Users from './components/user/Users.component';
import Search from './components/user/Search.component';
import About from './components/pages/About';
import User from './components/user/User';
import GithubState from './context/github/GithubState';

const App = () => {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	// the above code, mimicking this state
	// state = {
	// 	users: [],
	// 	user: {},
	// 	repos: [],
	// 	loading: false
	// };

	// get single github user
	const getUser = async (username) => {
		setLoading(true);
		const url = `https://api.github.com/users/${username}?client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const response = await axios.get(url);
		setUser(response.data);
		setLoading(false);
	};

	// get User repos
	const getUserRepos = async (username) => {
		setLoading(true);
		const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const response = await axios.get(url);
		setRepos(response.data);
		setLoading(false);
	};

	const clearUser = () => {
		setUsers([]);
		setLoading(false);
	};

	

	return (
		<GithubState>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Switch>
							<Route
								exact
								path="/"
								render={(props) => (
									<Fragment>
										<Search
											clearUser={clearUser}
											showClear={users.length > 0 ? true : false}
										/>
										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
							<Route
								exact
								path="/user/:login"
								render={(props) => (
									<User
										{...props}
										getUser={getUser}
										user={user}
										loading={loading}
										repos={repos}
										getUserRepos={getUserRepos}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
