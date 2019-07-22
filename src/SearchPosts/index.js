import React, { Component } from 'react';
import MatchedResults from '../MatchedResults'

class SearchPosts extends Component {
	constructor(){
		super();
		this.state = {
			matchedPosts: null
		}
	}
	searchPosts = async (e) => {
		e.preventDefault();
		try {
			const searchTerm = this.state.searchTerm
			console.log('searchTerm');
			console.log(searchTerm);
			const searchSplit = searchTerm.split(" ")
			console.log('searchSplit');
			console.log(searchSplit);
			const postSearch = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
				method: "GET",
				credentials: 'include'
			})
			const postSearchJson = await postSearch.json()
			console.log('postSearchJson');
			console.log(postSearchJson);

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

			for(let j = 0; j < searchSplit.length; j++){
				for(let k = 0; k < postArray.length; k++){
					console.log('postArray'[k]);
					console.log(postArray[k].keywords);
					for (let l = 0; l < postArray[k].keywords.length; l++) {
						if(searchSplit[j] === postArray[k].keywords[l]){
							console.log('match found', searchSplit[j], postArray[k].keywords[l]);
							matches.push(postArray[k])

						} else {
							console.log('no matches');
						}
						
					}
					
				}
			}


			const matchedPostsArray = [];
			for(let m = 0; m < matches.length; m++){
				console.log(postSearchJson[matches[m].originalIndex]);
				matchedPostsArray.push(postSearchJson[matches[m].originalIndex])
			}
			this.setState({
				matchedPosts: matchedPostsArray
			})


			
		} catch (err){
			console.error(err)
		}
	}
	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value});

	}

	handleClick = () => {
		this.props.getPostList()
		this.props.closeSearchPosts();
	}
	render(){
		return(
			<div className="searchPosts">
				<form onSubmit={this.searchPosts}>
					<input type="text" name="searchTerm" placeholder="Search Posts" onChange={this.handleChange}/>
					<button type="submit">Search</button>
				</form>
				{this.state.matchedPosts !== null ? <MatchedResults matchedPosts={this.state.matchedPosts}/> : null}
				{this.state.matchedPosts !== null ? <button onClick={this.handleClick}>Back</button> : null}
			</div>

			)
	}
}


export default SearchPosts;