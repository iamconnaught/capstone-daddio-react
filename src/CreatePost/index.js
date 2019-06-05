import React, { Component } from 'react';

class CreatePost extends Component {
	constructor(){
		super();
		this.state ={
			title: '',
			text: '',
			keywords: []
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const postResponse = await fetch(`${process.env.REACT_APP_BACKGROUND_URL}/post/new`, {
				method: 'POST',
		      	credentials: 'include', 
		      	body: JSON.stringify(this.state),
		      	headers:{
		        	'Content-Type': 'application/json'
		    		}
			})
			console.log('postResponse');
			console.log(postResponse);
			const parsedResponse = await postResponse.json();
			console.log('parsedResponse');
			console.log(parsedResponse);
			if (parsedResponse.status === 200) {
				this.props.history.push('/user')
			}
		} catch (err){
			console.error(err)
		}
	}
	render(){
		return(
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
					<input type="text" name="body" placeholder="Body" onChange={this.handleChange}/>
					<input type="text" name="keywords" placeholder="Keywords" onChange={this.handleChange}/>
					<button type="submit">Add Post</button>
				</form>
			</div>
			)
	}
}

export default CreatePost;