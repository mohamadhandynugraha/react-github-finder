import React, { useState, useContext } from 'react';
import swal from 'sweetalert';
import GithubContext from '../../context/github/githubContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	// state = {
	// 	text: ''
	// }; sama kayak di bawah kodingannya.
	const [ text, setText ] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			swal('Data input masih kosong', '', 'error');
		} else {
			githubContext.searchUsers(text);
			setText('');
		}
	};

	const onChange = (e) => {
		setText(e.target.value);
	};
	return (
		<div>
			<form onSubmit={onSubmit} className="form">
				<input type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange} />
				<input type="submit" className="btn-dark btn-block" value="Search" />
			</form>
			{githubContext.users.length > 0 && (
				<button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
