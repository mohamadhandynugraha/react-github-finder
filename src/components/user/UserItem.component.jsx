import React from 'react';
import {Link} from 'react-router-dom';

const UserItem = ({ user: { avatar_url, login, html_url } }) => {
	return (
		<div className="card text-center">
			<img src={avatar_url} style={{ width: '60px' }} className="round-img" alt="user_profile" />
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
					Learn More
				</Link>
			</div>
		</div>
	);
};

export default UserItem;
