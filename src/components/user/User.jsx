import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner.component';
import { Link } from 'react-router-dom';

class User extends Component {
	componentDidMount() {
		this.props.getUser(this.props.match.params.login);
	}
	render() {
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
		} = this.props.user;

		const { loading } = this.props;

		if (loading) return <Spinner />;

		return (
			<Fragment>
				<Link to="/" className="btn btn-light">
					Back to Search
				</Link>
				Hireable: {' '}
				{hireable ? (
					<i className="fas fa-check text-success" />
				) : (
					<i className="fas fa-times-circle text-danger" />
				)}
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
          <div className="badge badge-dark">
            Followers: {followers}
          </div>
          <div className="badge badge-light">
            Following: {following}
          </div>
          <div className="badge badge-blue">
            Public Gists: {public_gists}
          </div>
          <div className="badge badge-success">
            Public Repos: {public_repos}
          </div>
        </div>
			</Fragment>
		);
	}
}

export default User;
