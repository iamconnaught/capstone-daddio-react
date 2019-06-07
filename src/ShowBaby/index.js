import React, { Component } from 'react';
import EditBaby from '../EditBaby';

class ShowBaby extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			gender: 'unknown',
			dateOfBirth: null,
			idOfBabyBeingEdited: null

		}
	}
	componentDidMount(){
		this.getBaby();
	}
	getBaby = async () => {
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/${this.props.idOfBabyBeingShown}`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		console.log('fetchedData');
		console.log(fetchedData);
		const d = new Date(fetchedData.dateOfBirth);
		const readableDate = d.toLocaleDateString('en-UK', {
			    month: 'long'
			}) + ' ' 
				+ d.toLocaleDateString('en-UK', {
				day: '2-digit'
			}) + ', ' 
				+ d.toLocaleDateString('en-UK', {
				year: 'numeric'
			})
		this.setState({
			name: fetchedData.name,
			gender: fetchedData.gender,
			dateOfBirth: readableDate
		}) 
	}
	closeEdit = () => {

		this.getBaby();

		this.setState({
			idOfBabyBeingEdited: null
		})
	}
	editBaby = async (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		//const id = e.currentTarget.parentNode.dataset.babyId
		// console.log(id);
		this.setState({
			idOfBabyBeingEdited: this.props.idOfBabyBeingShown
		})
	}
	deleteBaby = async (e) => {
		e.preventDefault();
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/${this.props.idOfBabyBeingShown}`, {
				method: "DELETE",
				credentials: 'include'
			})
			this.props.getBabyList()
		} catch (err){
			console.error(err);
		}
	}
	render(){
		return(
			<div>
				<h1>{this.state.name}</h1>
				<p>Gender: {this.state.gender}</p>
				<p>Due Date: {this.state.dateOfBirth}</p>
				{this.state.idOfBabyBeingEdited !== null ? <EditBaby idOfBabyBeingEdited={this.state.idOfBabyBeingEdited} closeEdit={this.closeEdit}/> : null}
				<button onClick={this.deleteBaby}>Delete</button>
				<button onClick={this.editBaby}>Edit</button>
				<button onClick={this.props.hideBaby}>Back</button>
			</div>
		)
	}

}

export default ShowBaby;