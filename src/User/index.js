import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import RandomName from '../RandomName'

class User extends Component {
	render(){
		return(
			<div>
				<h1>User Profile</h1>
				<RandomName />
			</div>

			)
	}
}

export default User;