import React, { Component } from 'react';
import EditPost from '../EditPost';

class ShowPost extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			text: '',
			keywords: [],
			idOfPostBeingEdited: null
		}
	}
	componentDidMount(){
		// console.log('this.props.idOfTaskBeingShown at componentDidMount');
		// console.log(this.props.idOfTaskBeingShown);
		this.getPost();
	}
	getPost = async () => {
		// console.log('this.props.idOfTaskBeingShown at getTask');
		// console.log(this.props.idOfTaskBeingShown);
		const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${this.props.idOfPostBeingShown}`, {
			method: 'GET',
			credentials: 'include'
		});
		const fetchedData = await data.json();
		this.setState({
			title: fetchedData.title,
			text: fetchedData.text,
			keywords: fetchedData.keywords
		})
	}
	editPost = async (e) => {
		// console.log(e.currentTarget.parentNode.dataset);
		// const id = e.currentTarget.parentNode.dataset.taskId
		// console.log('id');
		// console.log(id);
		this.setState({
			idOfPostBeingEdited: this.props.idOfPostBeingShown
		})
	}
	closeEdit = () => {
		this.componentDidMount();
		this.setState({
			idOfPostBeingEdited: null
		})
	}
	deletePost = async (e) => {
		e.preventDefault();
		try {
			// console.log('delete this id');
			// console.log(e.currentTarget.parentNode.dataset);
			await fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${this.props.idOfPostBeingShown}`, {
				method: "DELETE",
				credentials: 'include'
			})
			this.props.getPostList()
		} catch (err){
			console.error(err);
		}
	}
	closeShow = () => {
		this.props.getPostList();
	}
	render(){
		console.log('this.state.text in showpost render');
		console.log(this.state.text);
		return(
			<div className="blog">
				<p>{this.state.text}</p>
				<p>Keywords: 	<strong>{this.state.keywords}</strong></p>
				{this.state.idOfPostBeingEdited !== null ? <EditPost idOfPostBeingEdited={this.state.idOfPostBeingEdited} closeEdit={this.closeEdit}/> : null}
				<button onClick={this.deletePost}>Delete</button>
				<button onClick={this.editPost}>Edit</button>
				<button onClick={this.closeShow}>Back</button>

			</div>
			)

	}
}
export default ShowPost;