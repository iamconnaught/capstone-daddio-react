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
	componentDidMount(){
		this.getFormData();
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {

			console.log("Baby ID")
			console.log(this.props.idOfBabyBeingEdited);

			const updatedBaby = await fetch(process.env.REACT_APP_BACKEND_URL + '/baby/' + this.props.idOfBabyBeingEdited, {
				method: "PUT",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers:  {
		        	'Content-Type': 'application/json'
		    	}
			})
			// console.log('updatedBaby');
			// console.log(updatedBaby);
			const parsedResponse = await updatedBaby.json();
			// if(parsedResponse.status === 200){
	  //   		this.props.history.push('../user/profile');
	  //   	}

	  		this.props.closeEdit();

		} catch (err){
			console.error(err)
		}
	}
	getFormData = async () => {
		try {
			const getBaby = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/${this.props.idOfBabyBeingEdited}`, {
				method: 'GET',
				credentials: "include"
			})
			const fetchedData = await getBaby.json();
			console.log('fetchedData');
			console.log(fetchedData);
			this.setState({
				name: fetchedData.name,
				gender: fetchedData.gender,
				dateOfBirth: fetchedData.dateOfBirth
			})
		} catch (err){
			console.error(err)
		}
	}
	render(){
		
		console.log("here is state for edit baby:");
		console.log(this.state)

		return(


			<div>
				<h1>EDIT BABY</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="name" 
						value={this.state.name} 
						onChange={this.handleChange}
					/>
					<div>
						<p>Current Date of Birth: </p>
						<p>{this.state.dateOfBirth ? this.state.dateOfBirth.toLocaleString() : null}</p>
					</div>
					<input 
						type="date" 
						name="date" 
						placeholder="YYYY-MM-DD" 
						onChange={this.handleChange}
					/>
					<select>
						<option value="Unknown">Unknown</option>
						<option value="Boy">Boy</option>
						<option value="Girl">Girl</option>
					</select>
					<button type="submit"> Update Baby </button>
				</form>
			</div>

		)
	}

}

export default EditBaby;