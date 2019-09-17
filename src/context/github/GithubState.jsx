import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, CLEAR_USERS, SET_LOADING, GET_REPOS, GET_USER } from '../types';

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [ state, dispatch ] = useReducer(GithubReducer, initialState);

	// SEARCH USERS
	const searchUsers = async (text) => {
		setLoading(true);
		const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env
			.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
		const response = await axios.get(url);
		dispatch({
			type: SEARCH_USERS,
			payload: response.data.items
		});
	};

	// GET USER

	// GET REPOS

	// CLEAR USER

	// SET LOADING
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
