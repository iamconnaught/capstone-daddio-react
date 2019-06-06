import React, { Component } from 'react';

class EditPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			text: '',
			keywords: []
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

			console.log("Post Id")
			console.log(this.props.idOfPostBeingEdited);

			await fetch(process.env.REACT_APP_BACKEND_URL + '/post/' + this.props.idOfPostBeingEdited, {
				method: "PUT",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers:  {
		        	'Content-Type': 'application/json'
		    	}
			})
			// console.log('updatedBaby');
			// console.log(updatedBaby);
			// const parsedResponse = await updatedPost.json();
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
			const getPost = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${this.props.idOfPostBeingEdited}`, {
				method: 'GET',
				credentials: "include"
			})
			const fetchedData = await getPost.json();
			console.log('fetchedData');
			console.log(fetchedData);
			this.setState({
				title: fetchedData.title,
				text: fetchedData.text,
				keywords: fetchedData.keywords
			})
		} catch (err){
			console.error(err)
		}
	}
	render(){
		
		console.log("here is state for edit post:");
		console.log(this.state)

		return(


			<div>
				<h1>EDIT Post</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="title" 
						value={this.state.title} 
						onChange={this.handleChange}
					/>
					<textarea 
						type="text" 
						name="text" 
						value={this.state.text} 
						onChange={this.handleChange}
					/>
					<input 
						type="text" 
						name="keywords" 
						value={this.state.keywords} 
						onChange={this.handleChange}
					/>
					<button type="submit"> Update Post </button>
				</form>
			</div>

		)
	}

}

export default EditPost;