import React, { useState } from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';

const Search = ({ searchUser, showClear, clearUser }) => {
	// state = {
	// 	text: ''
	// }; sama kayak di bawah kodingannya.
	const [ text, setText ] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			swal('Data input masih kosong', '', 'error');
		} else {
			searchUser(text);
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
			{showClear && (
				<button className="btn btn-light btn-block" onClick={clearUser}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	clearUser: PropTypes.func.isRequired,
	searchUser: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired
};

export default Search;
