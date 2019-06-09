import React, { Component } from 'react';
import { Link }from 'react-router-dom';


class Header extends Component {
	logOut = async () => {
		await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
			method: 'GET',
			credentials: 'include'
		})
	}
	render(){
		return(
			<header>
				<Link className='headerLink' to='/user'>Profile</Link>
				<Link className='headerLink' to='/baby/new'>Add Baby</Link>
				<Link onClick={this.logOut} className="headerLink" to='/'>Log Out</Link>
			</header>
		)
	}
}

export default Header;