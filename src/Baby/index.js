import React, { Component } from 'react';
import Countdown from '../Countdown';
import EditBaby from '../EditBaby';
import ShowBaby from '../ShowBaby';

class Baby extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			idOfBabyBeingEdited: null,
			idOfBabyBeingShown: null
		}
	}
	async componentDidMount(){
		this.getBabyList();
	}
	getBabyList = async () => {
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby`, {
			method: 'GET',
			credentials: 'include',
		});
		// console.log('data');
		// console.log(data);
		const fetchedData = await data.json();
		console.log(fetchedData);
		// console.log('fetchedData.name');
		// console.log(fetchedData.name);
		this.setState({
			list: fetchedData
		});
	}
	deleteBaby = async (e) => {
		e.preventDefault();
		// console.log(e.currentTarget.parentNode.dataset);
		try {
			await fetch(process.env.REACT_APP_BACKEND_URL + '/baby/' + e.currentTarget.parentNode.dataset.babyId, {
				method: "DELETE",
				credentials: 'include'
			})
			// console.log('deletedBaby');
			// console.log(deletedBaby);
			this.componentDidMount()		
		} catch (err){
			console.error(err)
		}
	}
	showBaby = (e) => {
		console.log('e.currentTarget');
		console.log(e.currentTarget);
		const id = e.currentTarget.parentNode.dataset.babyId
		console.log('id');
		console.log(id);
		this.setState({
			idOfBabyBeingShown: id
		})
	}
	closeEdit = () => {

		this.getBabyList();

		this.setState({
			idOfBabyBeingEdited: null
		})
	}
	editBaby = async (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.babyId
		// console.log(id);
		
		this.setState({
			idOfBabyBeingEdited: id
		})
	}
	render(){
		console.log('this.state in baby render');
		console.log(this.state);


		// console.log(this.state.list);
		const babyList = this.state.list.map((baby, i) => {
			return(
				<li data-baby-id={baby._id} key={baby._id}>
					<h1>Countdown to {baby.name}</h1>
					<button onClick={this.showBaby}>Show {baby.name} details </button>
					{this.state.idOfBabyBeingEdited !== null ? <EditBaby idOfBabyBeingEdited={this.state.idOfBabyBeingEdited} closeEdit={this.closeEdit}/> : null}
					<Countdown timeTilDate={baby.dateOfBirth} timeFormat="YYYY-MM-DD"/>
					<button onClick={this.deleteBaby}>Delete</button>
					<button onClick={this.editBaby}>Edit</button>
				</li>
			)
		})
		return(
			<div>
				
			{this.state.idOfBabyBeingShown === null ? <ul>{babyList}</ul> : null}
			{this.state.idOfBabyBeingShown !== null ? <ShowBaby idOfBabyBeingShown={this.state.idOfBabyBeingShown} /> : null}
			</div>

			)
	}



}

export default Baby;
