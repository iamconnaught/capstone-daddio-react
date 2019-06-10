import React, { Component } from 'react';
import ShowPost from '../ShowPost';
import CreatePost from '../CreatePost';
import SearchPosts from '../SearchPosts';

class Post extends Component {
	constructor(){
		super();
		this.state ={
			list: [],
			idOfPostBeingShown: null,
			createPostShowing:false,
			searchPostsShowing: false,
			postListShowing:true
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
			postListShowing:true,
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
			idOfPostBeingShown: id,
			createPostShowing: null,
			postListShowing: false
		})
	}
	showCreatePost = (e) => {
		this.setState({
			createPostShowing: true,
			postListShowing: false,
			searchPostsShowing:false
		})
	}
	closeCreatePost = () => {
		this.getPostList();
		this.setState({
			createPostShowing:false
		})
	}
	showSearchPosts = (e) => {
		this.setState({
			searchPostsShowing: true,
			createPostShowing:false,
			postListShowing: false
		})
	}
	closeSearchPosts = () => {
		this.getPostList();
		this.setState({
			searchPostsShowing:false
		})
	}
	render(){
		const postList = this.state.list.map((post) => {
			return(
				<div key={post._id} className="blog">
					<li className="postLi" data-post-id={post._id}>
						<span>{post.title}</span><br/>
						
						{this.state.idOfPostBeingShown === null ? <button onClick={this.showPost}>Show</button> : null}
					</li>
				</div>
			)
		});
		return(
			<div>
				<h2 className="blog">Blog</h2>
				{this.state.createPostShowing === false ? <button className="option" onClick={this.showCreatePost}>Add Post</button> : null }
				{this.state.createPostShowing ? <CreatePost getPostList={this.getPostList} closeCreatePost={this.closeCreatePost}/> : null}

				{this.state.searchPostsShowing === false ? <button className="option" onClick={this.showSearchPosts}>Search Post</button> : null }
				{this.state.searchPostsShowing ? <SearchPosts getPostList={this.getPostList} closeSearchPosts={this.closeSearchPosts}/> : null}

				{this.state.idOfPostBeingShown !== null ? <ShowPost idOfPostBeingShown={this.state.idOfPostBeingShown} getPostList={this.getPostList}/> : null}

				{this.state.postListShowing ? <ul className="postList">{postList}</ul> : null}
			</div>	
		)
	}
}

export default Post;