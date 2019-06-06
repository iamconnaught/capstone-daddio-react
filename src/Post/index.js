import React, { Component } from 'react';
import EditPost from '../EditPost';

class Post extends Component {
	constructor(){
		super();
		this.state ={
			list: [],
			idOfPostBeingEdited: null
		}
	}
	async componentDidMount(){
		this.getPostList();
	}
	getPostList = async () => {
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
	closeEdit = () => {
		this.getPostList();
		this.setState({
			idOfPostBeingEdited: null
		})
	}
	editPost = async (e) => {
		console.log(e.currentTarget.parentNode.dataset);
		const id = e.currentTarget.parentNode.dataset.postId
		console.log("id");
		console.log(id);
		this.setState({
			idOfPostBeingEdited: id
		})
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
						{this.state.idOfPostBeingEdited !== null ? <EditPost idOfPostBeingEdited={this.state.idOfPostBeingEdited} closeEdit={this.closeEdit}/> : null}
						<ul>{keywords}</ul>
						<button onClick={this.deletePost}>Delete</button>
						<button onClick={this.editPost}>Edit</button>
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