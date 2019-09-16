import React from 'react';
import UserItem from './UserItem.component';
import Spinner from '../layout/Spinner.component';


const User = ({ loading, users }) => {
	if (loading) {
		return <Spinner />;
	} else {
		return <div style={userStyle}>{users.map((user) => <UserItem key={user.id} user={user} />)}</div>;
	}
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	gridGap: '1rem'
};

export default User;
