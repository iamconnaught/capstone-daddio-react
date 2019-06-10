import React, { Component } from 'react';

import Baby from '../Baby';
import Name from '../Name';
import Post from '../Post';
import Task from '../Task';
import Header from '../Header';

class User extends Component {
	constructor(){
		super();
		this.state = {
			displayPost: false,
			displayTask: false,
			displayNames: false
		}

	}
	showPost = () => {
		
		this.setState({
			displayPost: true,
			displayTask: false,
			displayNames: false
		})
	}
	showTask = () => {
		
		this.setState({
			displayPost: false,
			displayTask: true,
			displayNames: false
		})
	}
	showNames = () => {
		
		this.setState({
			displayPost: false,
			displayTask: false,
			displayNames: true
		})
	}
	render(){

		console.log("user props:")
		console.log(this.props)

		return(
			<div>
				<Header />
				<div className="userPage">
					<Baby />
					<div className="userActivities">
						<div className="buttonContainer">
							{this.state.displayPost ? null : <button onClick={this.showPost}>Blog</button>}
							{this.state.displayTask ? null : <button onClick={this.showTask}>To-Do List</button>}
							{this.state.displayNames ? null : <button onClick={this.showNames}>Names</button>}
						</div>
						{this.state.displayPost ? <Post /> : null}
						{this.state.displayTask ? <Task /> : null}
						
						{this.state.displayNames ? <Name /> : null}
					</div>
				</div>
			</div>

			)
	}
}

export default User;