import React, { Component } from 'react';
import ShowTask from '../ShowTask';
import CreateTask from '../CreateTask';

class Task extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			idOfTaskBeingShown: null,
			createTaskShowing: false
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
			createTaskShowing: false,
			list: fetchedData
		})
	}
	showTask = (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.taskId
		// console.log('id');
		// console.log(id);
		this.setState({
			idOfTaskBeingShown: id,
			createTaskShowing: false
		})
	}
	showCreateTask = (e) => {
		this.setState({
			createTaskShowing: true
		})
	}
	closeCreateTask = () => {
		this.setState({
			createTaskShowing:false
		})
	}
	render(){
		console.log("idOfTaskBeingShown at render");
		console.log(this.state.idOfTaskBeingShown);
		const taskList = this.state.list.map((task) => {
				return(
					<li className="taskLi" data-task-id={task._id} key={task._id}>
						<span>{task.title}</span><br/>
						
						{this.state.idOfTaskBeingShown === null ? <button onClick={this.showTask}>Show</button> : null}

					</li>
				)
			});
			return(
				<div className="todo">
					<h2>To-Do List</h2>
					{this.state.createTaskShowing === false ? <button onClick={this.showCreateTask}>Add Task</button> : null }
					{this.state.createTaskShowing ? <CreateTask getTaskList={this.getTaskList} closeCreateTask={this.closeCreateTask}/> : null}
					{this.state.idOfTaskBeingShown === null ? <ul className="taskList">{taskList}</ul> : null}
					{this.state.idOfTaskBeingShown !== null ? <ShowTask idOfTaskBeingShown={this.state.idOfTaskBeingShown} getTaskList={this.getTaskList}/> : null}
				</div>	
			)
	}
}

export default Task;