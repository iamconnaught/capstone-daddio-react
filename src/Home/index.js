import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class Home extends Component{
	render(){
		return(
			<div className="home">
				<div id="homeTop">
					<h1 className="daddio">DADDIO</h1>
				</div>
				<div className="homeBottom">
					<span><Link to='/auth/login'>Login</Link></span>
					<span><Link to='/auth/register'>Register</Link></span>
				</div>
			</div>
		)
	}
}

export default Home;