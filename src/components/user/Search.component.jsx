import React, { Component } from 'react';
import swal from 'sweetalert';

class Search extends Component {
	state = {
		text: ''
	};

	onSubmit = (e) => {
		e.preventDefault();
		if (this.state.text === '') {
			swal('Data input masih kosong', '', 'error');
		} else {
			this.props.searchUser(this.state.text);
			this.setState({ text: '' });
		}
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { clearUser, showClear } = this.props;
		return (
			<div>
				<form onSubmit={this.onSubmit} className="form">
					<input
						type="text"
						name="text"
						placeholder="Search Users..."
						value={this.state.text}
						onChange={this.onChange}
					/>
					<input type="submit" className="btn-dark btn-block" value="Search" />
				</form>
				{showClear && (
					<button className="btn btn-light btn-block" onClick={clearUser}>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;