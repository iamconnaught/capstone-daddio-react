import React, { Component } from 'react';

class Post extends Component {
	constructor(){
		super();
		this.state ={
			list: [],
			postId: null
		}
	}
	async componentDidMount(){
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			list: fetchedData
		})
	}
	deletePost = async (e) => {
		e.preventDefault();
		console.log('delete hit');
		console.log(e.currentTarget.parentNode.dataset);
		try {
			const deletedPost = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${e.currentTarget.parentNode.dataset.postId}`, {
				method: 'DELETE',
				credentials: 'include'
			})
			console.log(deletedPost);
			this.componentDidMount();
		} catch (err){
			console.error(err)
		}
	}

	render(){
		const postList = this.state.list.map((post) => {
			const keywords = post.keywords.map((keyword, i) => {
				return(
					<li key={i}>
					{keyword}
					</li>
				)
			})
			return(
				<div>
					<li data-post-id={post._id} key={post._id}>
						<span>{post.title}</span><br/>
						<span>{post.text}</span><br/>
						<ul>{keywords}</ul>
						<button onClick={this.deletePost}>Delete</button>
					</li>
				</div>
			)
		});
		return(
			<div>
				<h1>Blog</h1>
				<ul>{postList}</ul>
			</div>	
		)
	}
}

export default Post;