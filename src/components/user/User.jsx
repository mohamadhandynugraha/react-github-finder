import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner.component';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user, loading, match, getUserRepos, getUser, repos }) => {
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		// eslint-disable-next-line
	}, []); // mimic behaviour componentDidMount, run once. komen diatas berguna untuk hilangin warning
	const {
		name,
		avatar_url,
		location,
		bio,
		blog,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		company,
		hireable
	} = user;

	if (loading) return <Spinner />;

	return (
		<Fragment>
			<Link to="/" className="btn btn-light">
				Back to Search
			</Link>
			Hireable: {' '}
			{hireable ? <i className="fas fa-check text-success" /> : <i className="fas fa-times-circle text-danger" />}
			<div className="card grid-2">
				<div className="all-center">
					<img src={avatar_url} className="round-img" alt="avatar" style={{ width: '150px' }} />
					<h1>{name}</h1>
					<p>Location: {location}</p>
				</div>
				<div>
					{bio && (
						<Fragment>
							<h3>Bio</h3>
							<p>{bio}</p>
						</Fragment>
					)}
					<a href={html_url} target="_blank" rel="noopener noreferrer" className="btn btn-dark m-1">
						Visits Github Profile
					</a>
					<ul>
						<li>
							{login && (
								<Fragment>
									<strong>Username: </strong>
									{login}
								</Fragment>
							)}
						</li>
						<li>
							{blog && (
								<Fragment>
									<strong>Blog: </strong>
									{blog}
								</Fragment>
							)}
						</li>
						<li>
							{company && (
								<Fragment>
									<strong>Company: </strong>
									{company}
								</Fragment>
							)}
						</li>
					</ul>
				</div>
			</div>
			<div className="card text-center">
				<div className="badge badge-dark">Followers: {followers}</div>
				<div className="badge badge-light">Following: {following}</div>
				<div className="badge badge-blue">Public Gists: {public_gists}</div>
				<div className="badge badge-success">Public Repos: {public_repos}</div>
			</div>
			<Repos repos={repos} />
		</Fragment>
	);
};

User.propTypes = {
	loading: PropTypes.bool,
	repos: PropTypes.array.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired
};

export default User;
