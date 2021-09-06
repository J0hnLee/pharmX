import React, { Component } from 'react';
import axios from 'axios';

class GetBackend extends Component {
	//re define the state

	constructor(props) {
		super(props);
		this.state = {
			name: 'John',
			posts: []
		};
	}

	// get function and setstate
	componentDidMount() {
		const randomStart = Math.floor(Math.random() * 10);
		axios
			.get('https://jsonplaceholder.typicode.com/photos')
			.then(response => {
				const posts = response.data.slice(randomStart, randomStart + 2);
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: 'Max'
					};
				});
				this.setState({ posts: updatedPosts });
				console.log(updatedPosts);
			})
			.catch(console.log(Error));
	}

	// post function function
	componentDidMount_2() {
		axios
			.get('http://127.0.0.1:5000/user/30')
			.then(response => console.log(response.data))
			.catch(console.log(Error));
	}

	render(
		kkkposts = this.state.posts.map(post => {
			return (
				<div>
					<div key={post.id}>{post.title}</div>
					<img src={post.url} alt="" />
				</div>
			);
		})
	) {
		return (
			<div>
				{kkkposts}
				<button onClick={() => this.componentDidMount_2()}>change</button>
			</div>
		);
	}
}

export default GetBackend;
