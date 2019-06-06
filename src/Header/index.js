import React, { Component } from 'react';
import { Link }from 'react-router-dom';


class Header extends Component {
	render(){
		return(
			<div>
				<Link to='/baby/new'>Add a Baby</Link>
				<Link to='/post/new'>Add a Post</Link>
				<Link to='/task/new'>Add a Task</Link>
				<Link to='/user'>Profile</Link>
			</div>
		)
	}
}

export default Header;