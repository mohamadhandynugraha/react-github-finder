import React from 'react';

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
	return (
		<div className="card text-center">
			<img src={avatar_url} style={{ width: '60px' }} className="round-img" alt="user_profile" />
			<h3>{login}</h3>
			<div>
				<a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm my-1">
					Learn More
				</a>
			</div>
		</div>
	);
};

export default UserItem;
