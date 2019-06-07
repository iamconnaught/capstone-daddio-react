import React, { Component } from 'react';
import ShowTask from '../ShowTask';

class Task extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			idOfTaskBeingShown: null
		}
	}
	async componentDidMount(){
		this.getTaskList();
	}
	getTaskList = async () => {
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			idOfTaskBeingShown: null,
			list: fetchedData
		})
	}
	// deleteTask = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		// console.log('delete this id');
	// 		// console.log(e.currentTarget.parentNode.dataset);
	// 		const deletedTask = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/${e.currentTarget.parentNode.dataset.taskId}`, {
	// 			method: "DELETE",
	// 			credentials: 'include'
	// 		})
	// 		this.componentDidMount()
	// 	} catch (err){
	// 		console.error(err);
	// 	}
	// }
	showTask = (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.taskId
		// console.log('id');
		// console.log(id);
		this.setState({
			idOfTaskBeingShown: id
		})
	}
	render(){
		console.log("idOfTaskBeingShown at render");
		console.log(this.state.idOfTaskBeingShown);
		const taskList = this.state.list.map((task) => {
				return(
					<li data-task-id={task._id} key={task._id}>
						<span>{task.title}</span><br/>
						
						{this.state.idOfTaskBeingShown === null ? <button onClick={this.showTask}>Show</button> : null}

					</li>
				)
			});
			return(
				<div className="todo">
					<h2>To-Do List</h2>
					{this.state.idOfTaskBeingShown === null ? <ul>{taskList}</ul> : null}
					{this.state.idOfTaskBeingShown !== null ? <ShowTask idOfTaskBeingShown={this.state.idOfTaskBeingShown} getTaskList={this.getTaskList}/> : null}
				</div>	
			)
	}
}

export default Task;