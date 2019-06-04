import React, { Component } from 'react';
import Countdown from '../Countdown';

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
	render(){
		console.log(this.state.list);
		const babyList = this.state.list.map((baby) => {
			return(
				<li data-baby-id={baby._id} key={baby._id}>
					<span>{baby.name}</span>
					<Countdown timeTilDate={baby.dateOfBirth} timeFormat="MM DD YYYY"/>

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
