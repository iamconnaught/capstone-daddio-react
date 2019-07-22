import React, { Component } from 'react';


class RandomName extends Component {
	constructor(props){
		super(props);
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
		// console.log("componentDidMount");
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
			this.props.getNameList()
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
			<div className="randomName">
			<h2>Name Suggestions</h2>
				<ul>
					{nameList}
				</ul>
				<button onClick={this.getRandomName}> Refresh </button>
			</div>

			)

	}
}

export default RandomName;