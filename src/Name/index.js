import React, { Component } from 'react';
import RandomName from '../RandomName';

class Name extends Component {
	constructor(){
		super();
		this.state = {
			list: [],
			nameId: null
		}
	}
	componentDidMount(){
		this.getNameList();
	}
	getNameList = async () => {
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/name`, {
			method: 'GET',
			credentials: 'include'
		})
		const fetchedData = await data.json()
		this.setState({
			list: fetchedData
		});
	}
	deleteName = async (e) => {
		e.preventDefault();
		console.log(e.currentTarget.parentNode.dataset);
		try {
			const deletedName = await fetch(process.env.REACT_APP_BACKEND_URL + '/name/' + e.currentTarget.parentNode.dataset.nameId, {
				method: "DELETE",
				credentials: 'include'
			})
			console.log('deletedName');
			console.log(deletedName);
			this.getNameList();		
		} catch (err){
			console.error(err)
		}
	}
	render() {
		const nameList = this.state.list.map((name) => {
			return(
				<li data-name-id={name._id} key={name._id}>
					<span>{name.name}</span>
					<button onClick={this.deleteName}>Delete</button>
				</li>

				)
		})
		return(
			<div className="name">
				<h2>Names to Consider</h2>
				<ul> {nameList} </ul>
				<RandomName getNameList={this.getNameList}/>
			</div>
			)
	}

}

export default Name;