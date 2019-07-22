import React, { Component } from 'react';

class MatchedResults extends Component {
	// constructor(props){
	// 	super(props);
	// }
	render(){
		console.log('this.props');
		console.log(this.props);

		const postList = this.props.matchedPosts.map((post) => {
			return(
				<div className="blog" key={post._id}>
					<li data-matchedPost-id={post._id} >
						<h3>{post.title}</h3>
						<span>{post.text}</span>
					</li>
				</div>
			)
		})
		return(
			<div>
				<h2 className="blog">Related Posts</h2>
				<ul>{postList}</ul>
			</div>
		)
	}
}

export default MatchedResults;