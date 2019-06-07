import React, { Component } from 'react';
import RandomName from '../RandomName';
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
		return(
			<div>
				<Header />
				<Baby />
				<div className="buttonContainer">
					<button onClick={this.showPost}>Blog</button>
					<button onClick={this.showTask}>To-Do List</button>
					<button onClick={this.showNames}>Names</button>
				</div>
				{this.state.displayPost ? <Post /> : null}
				{this.state.displayTask ? <Task /> : null}
				{this.state.displayNames ? <RandomName /> : null}
				{this.state.displayNames ? <Name /> : null}
			</div>

			)
	}
}

export default User;