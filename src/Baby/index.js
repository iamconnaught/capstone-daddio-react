import React, { Component } from 'react';
import Countdown from '../Countdown';
import { Link } from 'react-router-dom';
import EditBaby from '../EditBaby';

class Baby extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			idOfBabyBeingEdited: null
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
		console.log('data');
		console.log(data);
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
		console.log(e.currentTarget.parentNode.dataset);
		try {
			const deletedBaby = await fetch(process.env.REACT_APP_BACKEND_URL + '/baby/' + e.currentTarget.parentNode.dataset.babyId, {
				method: "DELETE",
				credentials: 'include'
			})
			console.log('deletedBaby');
			console.log(deletedBaby);
			this.componentDidMount()		
		} catch (err){
			console.error(err)
		}
	}
	closeEdit = () => {

		this.getBabyList();

		this.setState({
			idOfBabyBeingEdited: null
		})
	}
	editBaby = async (e) => {
		console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.babyId
		console.log(id);
		
		this.setState({
			idOfBabyBeingEdited: id
		})
		
	// 	try {
	// 		const updatedBaby = await fetch(process.env.REACT_APP_BACKEND_URL + '/baby/' + e.currentTarget.parentNode.dataset.babyId, {
	// 			method: "PUT",
	// 			credentials: 'include',
	// 			body: JSON.stringify(this.state),
	// 			headers:{
	// 	        'Content-Type': 'application/json'
	// 	    		}
	// 		})
	// 		const parsedResponse = await updatedBaby.json();
	// 		if(parsedResponse.status === 200){
	//     		this.props.history.push('../user/profile');
	//     	}
	// 	} catch (err){
	// 		console.error(err)
	// 	}

	}
	// editBaby(e){
	// 	 // <Link to="/baby/edit"  babyId={e.currentTarget.parentNode.dataset.babyId}>Edit</Link>

	// }
	render(){
		console.log(this.state);


		// console.log(this.state.list);
		const babyList = this.state.list.map((baby, i) => {
			return(
				<li data-baby-id={baby._id} key={baby._id}>
					<h1>Countdown to {baby.name}</h1>
					{this.state.idOfBabyBeingEdited !== null ? <EditBaby idOfBabyBeingEdited={this.state.idOfBabyBeingEdited} closeEdit={this.closeEdit}/> : null}
					<Countdown timeTilDate={baby.dateOfBirth} timeFormat="YYYY-MM-DD"/>
					<button onClick={this.deleteBaby}>Delete</button>
					<button onClick={this.editBaby}>Edit</button>
				</li>
			)
		})
		return(
			<div>
				<ul>{babyList}</ul>
			</div>

			)
	}



}

export default Baby;
