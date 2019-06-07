import React, { Component } from 'react';
import ShowPost from '../ShowPost';

class Post extends Component {
	constructor(){
		super();
		this.state ={
			list: [],
			idOfPostBeingShown: null
			// idOfPostBeingEdited: null
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
			idOfPostBeingShown: null,
			list: fetchedData
		})
	}
	// deletePost = async (e) => {
	// 	e.preventDefault();
	// 	console.log('delete hit');
	// 	console.log(e.currentTarget.parentNode.dataset);
	// 	try {
	// 		const deletedPost = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${e.currentTarget.parentNode.dataset.postId}`, {
	// 			method: 'DELETE',
	// 			credentials: 'include'
	// 		})
	// 		console.log(deletedPost);
	// 		this.componentDidMount();
	// 	} catch (err){
	// 		console.error(err)
	// 	}
	// }
	// closeEdit = () => {
	// 	this.getPostList();
	// 	this.setState({
	// 		idOfPostBeingEdited: null
	// 	})
	// }
	// editPost = async (e) => {
	// 	console.log(e.currentTarget.parentNode.dataset);
	// 	const id = e.currentTarget.parentNode.dataset.postId
	// 	console.log("id");
	// 	console.log(id);
	// 	this.setState({
	// 		idOfPostBeingEdited: id
	// 	})
	// }
	showPost = (e) => {
		const id = e.currentTarget.parentNode.dataset.postId;
		this.setState({
			idOfPostBeingShown: id
		})
	}

	render(){
		const postList = this.state.list.map((post) => {
			return(
				<div className="blog">
					<li data-post-id={post._id} key={post._id}>
						<span>{post.title}</span><br/>
						
						{this.state.idOfPostBeingShown === null ? <button onClick={this.showPost}>Show</button> : null}
					</li>
				</div>
			)
		});
		return(
			<div>
				<h2 className="blog">Blog</h2>
				{this.state.idOfPostBeingShown === null ? <ul>{postList}</ul> : null }
				{this.state.idOfPostBeingShown !== null ? <ShowPost idOfPostBeingShown={this.state.idOfPostBeingShown} getPostList={this.getPostList}/> : null}
			</div>	
		)
	}
}

export default Post;