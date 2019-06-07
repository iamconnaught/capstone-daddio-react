import React, { Component } from 'react';
import Header from '../Header';
import MatchedResults from '../MatchedResults'

class CreateTask extends Component {
	constructor(){
		super();
		this.state = {
			title: '',
			details: '',
			isCompleted: false,
			matchedPosts: null

		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const taskResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/task/new`, {
				method: "POST",
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await taskResponse.json();
			console.log('create task parsedResponse');
			console.log(parsedResponse);
			this.searchPosts();

		} catch (err){
			console.error(err)
		}
	}
	searchPosts = async () => {
		try {
			//split title into array
			const title = this.state.title
			console.log('title');
			console.log(title);
			const titleSplit = title.split(" "); 
			console.log('titleSplit');
			console.log(titleSplit);

			//get all posts
			const postSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
				method: 'GET',
				credentials: 'include'
			})
			const postSearchJson = await postSearch.json()
			console.log('postSearchJson');
			console.log(postSearchJson);

			//map over posts, split keywords, find match
			const matches = [];

			const postArray = postSearchJson.map((post, i) => {
				
				const newEntry = {
					keywords: post.keywords.split(" "),
					originalIndex: i
				}

				return newEntry;
			})
			

			console.log("new post array for matching:")
			console.log(postArray)


			for(let j = 0; j < titleSplit.length; j++){
				for(let k = 0; k < postArray.length; k++){
					console.log('postArray[k]');
					console.log(postArray[k].keywords);
					for (let l = 0; l < postArray[k].keywords.length; l++) {
						if(titleSplit[j] === postArray[k].keywords[l]){
							console.log('match found', titleSplit[j], postArray[k].keywords[l]);
							matches.push(postArray[k])

						} else {
							console.log('no matches');
						}
						
					}
					
				}
			}
			// console.log(postKeywordsArray);
			// const postKeywords = postSearchJson[0].keywords;
			// console.log('postKeywords');
			// console.log(postKeywords);
			// const postKeywordsSplit = postKeywords.split(" ");
			console.log('matches after matching');
			console.log(matches);
			console.log('generating the rest of the post using original index');
			console.log(postSearchJson[matches[0].originalIndex]);

			const matchedPostsArray = [];
			for(let m = 0; m < matches.length; m++){
				console.log(postSearchJson[matches[m].originalIndex]);
				matchedPostsArray.push(postSearchJson[matches[m].originalIndex])
			}
			this.setState({
				matchedPosts: matchedPostsArray
			})


		} catch (err){
			console.error(err);
		}


		
	}
	render(){
		return(
			<div>
				<Header />
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
					<input type="text" name="details" placeholder="Details" onChange={this.handleChange}/>
					<button type="submit">Add Task</button>
				</form>
				{this.state.matchedPosts !== null ? <MatchedResults matchedPosts={this.state.matchedPosts}/> : null}
			</div>
			)
	}
}

export default CreateTask;