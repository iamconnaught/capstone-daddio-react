import React, { Component } from 'react';

class EditBaby extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			gender: "Unknown",
			dateOfBirth: null
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('this.props');
		console.log(this.props);
	}
	getFormData = async () => {
		try {
			const getBaby = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/${this.props.babyId}`, {
				method: 'GET',
				credentials: "include"
			})
			const fetchedData = await getBaby.json();
			console.log('fetchedData');
			console.log(fetchedData);
		} catch (err){
			console.error(err)
		}
	}
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="name" onChange={this.handleChange}/>
					<input type="date" name="date" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
					<select>
						<option value="Unknown">Unknown</option>
						<option value="Boy">Boy</option>
						<option value="Girl">Girl</option>
					</select>
					<button type="submit"> Edit Baby </button>
				</form>
			</div>

			)
	}

}

export default EditBaby;