import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar.component';
import Home from './components/pages/Home';
import About from './components/pages/About';
import User from './components/user/User';
import GithubState from './context/github/GithubState';
import NotFound from './components/pages/NotFound';

const App = () => {
	return (
		<GithubState>
			<Router>
				<div className="App">
					<Navbar />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/about" component={About} />
							<Route exact path="/user/:login" component={User} />
							<Route component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
