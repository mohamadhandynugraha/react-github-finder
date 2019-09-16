import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import User from './components/user/User.component';
import Search from './components/user/Search.component';
import About from './components/pages/About';

class App extends React.Component {
	state = {
		users: [],
		loading: false
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
		const { users, loading } = this.state;
		return (
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<Fragment>
										<Search
											searchUser={this.searchUser}
											clearUser={this.clearUser}
											showClear={users.length > 0 ? true : false}
										/>
										<User loading={loading} users={users} />
									</Fragment>
								)}
							/>
							<Route exact path="/about" component={About} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
