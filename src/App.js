import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Users from './components/user/Users.component';
import Search from './components/user/Search.component';
import About from './components/pages/About';
import User from './components/user/User';

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

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

	const searchUser = async (text) => {
		setLoading(true);
		const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		console.log(url);
		const response = await axios.get(url);
		setUsers(response.data.items);
		setLoading(false);
	};

		
		return (
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
											searchUser={searchUser}
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
		);
	}

export default App;
