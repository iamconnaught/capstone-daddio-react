import React, { Component } from 'react';

class Name extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			nameId: null
		}
	}
	async componentDidMount(){
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/name`, {
			method: 'GET',
			credentials: 'include'
		})
		const fetchedData = await data.json()
		this.setState({
			list: fetchedData
		});
	}
	render() {
		const nameList = this.state.list.map((name) => {
			return(
				<li data-name-id={name._id} key={name._id}>
					<span>{name.name}</span>
				</li>

				)
		})
		return(
			<ul> {nameList} </ul>
			)
	}

}

export default Name;