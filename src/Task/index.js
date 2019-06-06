import React, { Component } from 'react';
import EditTask from '../EditTask';

class Task extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			idOfTaskBeingEdited: null
		}
	}
	async componentDidMount(){
		this.getPostList();
	}
	getPostList = async () => {
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			list: fetchedData
		})
	}
	deleteTask = async (e) => {
		e.preventDefault();
		try {
			console.log('delete this id');
			console.log(e.currentTarget.parentNode.dataset);
			const deletedTask = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/${e.currentTarget.parentNode.dataset.taskId}`, {
				method: "DELETE",
				credentials: 'include'
			})
			this.componentDidMount()
		} catch (err){
			console.error(err);
		}
	}
	editTask = async (e) => {
		console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.taskId
		console.log('id');
		console.log(id);
		this.setState({
			idOfTaskBeingEdited: id
		})
	}
	closeEdit = () => {
		this.getTaskList();
		this.setState({
			idOfTaskBeingEdited: null
		})
	}
	render(){
		const taskList = this.state.list.map((task) => {
				return(
					<li data-task-id={task._id} key={task._id}>
						<span>{task.title}</span><br/>
						<span>{task.details}</span><br/>
						{this.state.idOfTaskBeingEdited !== null ? <EditTask idOfTaskBeingEdited={this.state.idOfTaskBeingEdited} closeEdit={this.closeEdit}/> : null}
						<button onClick={this.deleteTask}>Delete</button>
						<button onClick={this.editTask}>Edit</button>
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