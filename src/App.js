import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Users from './components/user/Users.component';
import Search from './components/user/Search.component';
import About from './components/pages/About';
import User from './components/user/User';

class App extends React.Component {
	state = {
		users: [],
		user: {},
		loading: false
	};

	// get single github user
	getUser = async (username) => {
		this.setState({ loading: true });
		const url = `https://api.github.com/users/${username}?client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const response = await axios.get(url);
		this.setState({ user: response.data, loading: false });
	};

	clearUser = () => {
		this.setState({ users: [], loading: false });
	};

	searchUser = async (text) => {
		this.setState({ loading: true });
		const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		console.log(url);
		const response = await axios.get(url);
		this.setState({ users: response.data.items, loading: false });
	};

	render() {
		const { users, user, loading } = this.state;
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
											searchUser={this.searchUser}
											clearUser={this.clearUser}
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
									<User {...props} getUser={this.getUser} user={user} loading={loading} />
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
