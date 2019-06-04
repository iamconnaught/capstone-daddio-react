import React, { Component } from 'react';
import Countdown from '../Countdown';
import { Link } from 'react-router-dom';

class Baby extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			babyId: null
		}
	}
	async componentDidMount(){
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
	// editBaby = async (e) => {
	// 	e.preventDefault();
	// 	console.log(e.currentTarget.parentNode.dataset);
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

	// }
	render(){
		console.log(this.state.list);
		const babyList = this.state.list.map((baby) => {
			return(
				<li data-baby-id={baby._id} key={baby._id}>
					<span>{baby.name}</span><br/>
					<span>{baby.dateOfBirth}</span><br/>
					<button onClick={this.deleteBaby}>Delete</button>
					<Link to="/baby/edit" name={baby.name} gender={baby.gender} dateOfBirth={baby.dateOfBirth}>Edit</Link>
					<Countdown timeTilDate={baby.dateOfBirth} timeFormat="YYYY-MM-DD"/>

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
