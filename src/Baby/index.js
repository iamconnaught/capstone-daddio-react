import React, { Component } from 'react';
import Countdown from '../Countdown';
// import EditBaby from '../EditBaby';
import ShowBaby from '../ShowBaby';

class Baby extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			// idOfBabyBeingEdited: null,
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
		// const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
		// 	method: 'GET',
		// 	credentials: 'include'
		// })
		console.log('data');
		console.log(data);
		const fetchedData = await data.json();
		console.log('fetchedData');
		console.log(fetchedData);
		// console.log('fetchedData.baby');
		// console.log(fetchedData.baby);

		// const babyData = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/${fetchedData.baby}`, {
		// 	method: 'GET',
		// 	credentials: 'include'
		// })
		// console.log('babyData');
		// console.log(babyData);
		// const fetchedBabyData = await babyData.json();
		// console.log('fetchedBabyData');
		// console.log(fetchedBabyData);
		this.setState({
			idOfBabyBeingShown: null,
			list: fetchedData.data
		});
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
	hideBaby = () => {
		console.log('hideBaby');
		this.getBabyList();
		this.setState({
			idOfBabyBeingShown: null
		})
	}
	closeEdit = () => {

		this.getBabyList();

		this.setState({
			idOfBabyBeingEdited: null
		})
	}
	// editBaby = async (e) => {
	// 	// console.log(e.currentTarget.parentNode.dataset);
	// 	const id = e.currentTarget.parentNode.dataset.babyId
	// 	// console.log(id);
		
	// 	this.setState({
	// 		idOfBabyBeingEdited: id
	// 	})
	// }
	
	render(){
		console.log('this.state in baby render');
		console.log(this.state);


		// console.log(this.state.list);
		const babyList = this.state.list.map((baby, i) => {
			return(
				<li data-baby-id={baby._id} key={baby._id}>
					<h1>Countdown to {baby.name}</h1>
					<button onClick={this.showBaby} >Show {baby.name} details </button>
					<Countdown timeTilDate={baby.dateOfBirth} timeFormat="YYYY-MM-DD"/>
				</li>
			)
		})
		return(
			<div className="baby">
				
			{this.state.idOfBabyBeingShown === null ? <ul>{babyList}</ul> : null}
			{this.state.idOfBabyBeingShown !== null ? <ShowBaby idOfBabyBeingShown={this.state.idOfBabyBeingShown} hideBaby={this.hideBaby} getBabyList={this.getBabyList}/> : null}

			</div>

			)
	}



}

export default Baby;
