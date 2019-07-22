import React, { Component } from 'react';


class CreatePost extends Component {
	constructor(props){
		super(props);
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
			const postResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/new`, {
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
			this.props.getPostList();
			this.props.closeCreatePost();
		} catch (err){
			console.error(err)
		}
	}
	render(){
		return(
			<div>
				<form className="postForm" onSubmit={this.handleSubmit}>
					<input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
					<input type="text" name="keywords" placeholder="Keywords" onChange={this.handleChange}/>
					<textarea type="text" name="text" placeholder="Text" onChange={this.handleChange}/>
					<button type="submit">Add Post</button>
				</form>
			</div>
			)
	}
}

export default CreatePost;