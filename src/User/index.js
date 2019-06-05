import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import RandomName from '../RandomName';
import Baby from '../Baby';
import Name from '../Name';
import Post from '../Post';
import Task from '../Task';

class User extends Component {
	render(){
		return(
			<div>
				<h1>User Profile</h1>
				<Link to='/baby/new'>Add a Baby</Link>
				<Link to='/post/new'>Add a Post</Link>
				<Link to='/task/new'>Add a Task</Link>
				<Post />
				<Task />
				<Baby />
				<RandomName />
				<Name />
			</div>

			)
	}
}

export default User;