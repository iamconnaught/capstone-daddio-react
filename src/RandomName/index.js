import React, { Component } from 'react';
import { Link }from 'react-router-dom';

class RandomName extends Component {
	constructor(){
		super();
		this.state = {
			results: null
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	} 
	componentDidMount(){
		console.log("componentDidMount");
		this.getRandomName();
	}
	getRandomName = async () => {
		console.log("getRandomName hit");
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/name/random`)
			const names = await response.json()

			console.log('names');
			console.log(names);
			this.setState({
				results: names.names
			})

		} catch (err){
			console.log(err);
		}
	}
	handleClick = async (i, e) => {
		e.preventDefault();
		console.log(this.state.results[i]);
		const apiCall = `${process.env.REACT_APP_BACKEND_URL}/name/new`;
		try {
			const addedName = await fetch(apiCall, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					name: this.state.results[i]
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await addedName.json();
			console.log('parsedResponse');
			console.log(parsedResponse);
		} catch (err){
			console.log(err);
		}
	}
	render(){
		let nameList = null;
		if (this.state.results) {
			nameList = this.state.results.map((element, i) => {
				return(
					<li key={i} >
						<span>{element}</span>
						<button onClick={this.handleClick.bind(null, i)}>Save Name</button>
					</li>
					)
			})
		}
		return(
			<div>
			<span><strong>Name Suggestions</strong></span>
				<ul>
					{nameList}
				</ul>
			</div>

			)

	}
}

export default RandomName;