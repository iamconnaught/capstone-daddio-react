import React, { Component } from 'react';

class Task extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			taskId: null
		}
	}
	async componentDidMount(){
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			list: fetchedData
		})
	}
	render(){
		const taskList = this.state.list.map((task) => {
				return(
					<li data-post-id={task._id} key={task._id}>
						<span>{task.title}</span><br/>
						<span>{task.details}</span><br/>
						<button onClick={this.deleteTask}>Delete</button>
					</li>
				)
			});
			return(
				<div>
					<h1>To-Do List</h1>
					<ul>{taskList}</ul>
				</div>	
			)
	}
}

export default Task;