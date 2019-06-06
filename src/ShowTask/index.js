import React, { Component } from 'react';
import EditTask from '../EditTask';

class ShowTask extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			details: '',
			idOfTaskBeingEdited: null,
			isCompleted: null
		}
	}
	componentDidMount(){
		// console.log('this.props.idOfTaskBeingShown at componentDidMount');
		// console.log(this.props.idOfTaskBeingShown);
		this.getTask();
	}
	getTask = async () => {
		// console.log('this.props.idOfTaskBeingShown at getTask');
		// console.log(this.props.idOfTaskBeingShown);
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/${this.props.idOfTaskBeingShown}`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			title: fetchedData.title,
			details: fetchedData.details,
			isCompleted: fetchedData.isCompleted
		})
	}
	editTask = async (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		// const id = e.currentTarget.parentNode.dataset.taskId
		// console.log('id');
		// console.log(id);
		this.setState({
			idOfTaskBeingEdited: this.props.idOfTaskBeingShown
		})
	}
	closeEdit = () => {
		this.componentDidMount();
		this.setState({
			idOfTaskBeingEdited: null
		})
	}
	toggleComplete = async () => {
		const completedTask = await fetch(process.env.REACT_APP_BACKEND_URL + '/task/' + this.props.idOfTaskBeingShown, {
				method: "PUT",
				credentials: 'include',
				body: JSON.stringify({isCompleted: true}),
				headers:  {
		        	'Content-Type': 'application/json'
		    	}
			})
		const parsedResponse =  await completedTask.json()
		console.log('parsedResponse');
		console.log(parsedResponse);
		this.getTask();
		this.setState({
			isCompleted: true
		})
	}
	render(){
		return(
			<div>
				<p>{this.state.details}</p>
				{this.state.idOfTaskBeingEdited !== null ? <EditTask idOfTaskBeingEdited={this.state.idOfTaskBeingEdited} closeEdit={this.closeEdit}/> : null}
				{this.state.isCompleted === true ? <span>You did it!</span> : null}
				<button onClick={this.deleteTask}>Delete</button>
				<button onClick={this.editTask}>Edit</button>
				<button onClick={this.toggleComplete}>Done</button>
			</div>
			)

	}
}
export default ShowTask;