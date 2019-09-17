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
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	// get User repos
	const getUserRepos = async (username) => {
		setLoading(true);
		const url = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const response = await axios.get(url);
		setRepos(response.data);
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
										<Search />
										<Users  />
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
