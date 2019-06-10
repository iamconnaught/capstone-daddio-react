import React, { Component } from 'react';
import Header from '../Header';

class CreateBaby extends Component {
	constructor(){
		super();
		this.state = {
			name: null,
			gender: "unknown",
			dateOfBirth: null

		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const babyResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/baby/new`, {
				method: 'POST',
		      	credentials: 'include', 
		      	body: JSON.stringify(this.state),
		      	headers:{
		        	'Content-Type': 'application/json'
		    		}
			})
			const parsedResponse = await babyResponse.json();
        	if(parsedResponse.status === 200){
	    		this.props.history.push('/user');
	    	}
		} catch (err){
			console.error(err)
		}
	}
	render(){
		return(
			<div>
				<Header />
				<div className="createBaby">
					<form className="createForm" onSubmit={this.handleSubmit}>
						<input type="text" name="name" placeholder="name" onChange={this.handleChange}/>
						<input type="date" name="date" placeholder="YYYY-MM-DD" onChange={this.handleChange}/>
						<select>
							<option value="Unknown">Unknown</option>
							<option value="Boy">Boy</option>
							<option value="Girl">Girl</option>
						</select>
						<button type="submit"> Add Baby </button>
					</form>
					<p className="babyPara">Fill out any information that you have. Feel free to comeback and edit the <strong>Name</strong> and <strong>Gender</strong> as it becomes known to you.</p>
				</div>
			</div>

			)
	}
}

export default CreateBaby;