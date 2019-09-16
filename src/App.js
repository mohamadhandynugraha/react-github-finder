import React from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import User from './components/user/User.component';
import Search from './components/user/Search.component';

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
		const response = await axios.get(url);
		this.setState({ users: response.data.items, loading: false });
	};

	render() {
		const {users, loading} = this.state;
		return (
			// returnnya, harus one parent element kalau di react jsx.
			<div className="App">
				<Navbar />
				<div className="container">
					<Search
						searchUser={this.searchUser}
						clearUser={this.clearUser}
						showClear={users.length > 0 ? true : false}
					/>
					<User loading={loading} users={users} />
				</div>
			</div>
		);
	}
}

export default App;
