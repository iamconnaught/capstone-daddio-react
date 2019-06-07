import React, { Component } from 'react';
import { Link }from 'react-router-dom';


class Header extends Component {
	render(){
		return(
			<header>
				<Link className='headerLink' to='/user'>Profile</Link>
				<Link className='headerLink' to='/baby/new'>Add Baby</Link>
				<Link className='headerLink' to='/post/new'>Add Post</Link>
				<Link className='headerLink' to='/task/new'>Add Task</Link>
			</header>
		)
	}
}

export default Header;