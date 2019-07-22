import React, { Component } from 'react';
import Countdown from '../Countdown';
import ShowBaby from '../ShowBaby';

class Baby extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
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

		console.log('data');
		console.log(data);
		const fetchedData = await data.json();
		console.log('fetchedData');
		console.log(fetchedData);
		

		if(fetchedData.status !== 200){
			this.props.history.push('/error')
		}
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
	
	render(){
		console.log('this.state in baby render');
		console.log(this.state);


		
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
