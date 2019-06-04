import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import RandomName from '../RandomName';
import Countdown from '../Countdown';
import Baby from '../Baby';
import Name from '../Name';

class User extends Component {
	render(){
		return(
			<div>
				<h1>User Profile</h1>
				<RandomName />
				<Countdown timeTilDate="06 10 2019" timeFormat="MM DD YYYY"/>
				<Baby />
				<Name />
			</div>

			)
	}
}

export default User;