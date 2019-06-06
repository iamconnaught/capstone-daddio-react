import React, { Component } from 'react';

class EditBaby extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			gender: "Unknown",
			dateOfBirth: '1999-09-09'
		}
	}
	componentDidMount(){
		this.getFormData();
	}
	handleChange = (e) => {
		console.log("here is e.target.value in handle change");
		console.log(e.target.value);
		this.setState({[e.target.name]: new Date(e.target.value)});
	}
	handleSubmit = async (e) => {
		console.log(e.target.value);
		e.preventDefault();
		try {

			console.log("Baby ID")
			console.log(this.props.idOfBabyBeingEdited);

			await fetch(process.env.REACT_APP_BACKEND_URL + '/baby/' + this.props.idOfBabyBeingEdited, {
				method: "PUT",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers:  {
		        	'Content-Type': 'application/json'
		    	}
			})
			// console.log('updatedBaby');
			// console.log(updatedBaby);
			// const parsedResponse = await updatedBaby.json();
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
			const d = new Date(fetchedData.dateOfBirth)

			const dob = d.toLocaleDateString('en-US', {
			    year: 'numeric'
			}) + '-' + d.toLocaleDateString('en-US', {

				month: '2-digit'
			}) + '-' + d.toLocaleDateString('en-US', {

				day: '2-digit'
			})

			this.setState({
				name: fetchedData.name,
				gender: fetchedData.gender,
				dateOfBirth: dob
			})
		} catch (err){
			console.error(err)
		}
	}
	render(){
		
		console.log("here is state for edit baby:");
		console.log(this.state)
		// const d = new Date('09-26-1978')
		// console.log(d);
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
						value={this.state.dateOfBirth} 
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