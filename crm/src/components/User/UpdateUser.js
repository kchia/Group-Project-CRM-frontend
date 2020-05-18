import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../../config.js';
import UserForm from './UserForm.js';

const UserEdit = ({ match }) => {
	const [user, setUser] = useState(null);
	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);
	  const emailId = match.params.emailId;
	useEffect(() => {
		const url = `${APIURL}/users/${emailId}`;
		fetch(url)
			.then((response) => response.json())
			.then(setUser)
			.catch(() => {
	
				setError(true);
			});
	}, []);

	const handleChange = (event) => {
		event.persist();
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/api/users/${emailId}`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(user),
		})
			.then((response) => response.json())
			.then((data) => {
				setCreatedId(data._id);
			})
			.catch(() => {
				setError(true);
			});
	};

	if (createdId) {
		return <Redirect to={`/api/users/${emailId}`} />;
	}
	return (
		<div>
			<UserForm
				user={user}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
};

export default UserEdit;
