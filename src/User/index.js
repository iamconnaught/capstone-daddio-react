import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import RandomName from '../RandomName';
import Countdown from '../Countdown';

class User extends Component {
	render(){
		return(
			<div>
				<h1>User Profile</h1>
				<RandomName />
				<Countdown timeTilDate="06 26 2019, 6:00 am" timeFormat="MM DD YYYY, h:mm a"/>
			</div>

			)
	}
}

export default User;