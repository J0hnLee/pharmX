import React, { useState } from 'react';
import axios from 'axios';

// const randomStart = Math.floor(Math.random() * 10);

// axios
// 	.get('https://jsonplaceholder.typicode.com/photos')
// 	.then(response => {
// 		const posts = response.data.slice(randomStart, randomStart + 2);
// 		const updatedPosts = posts.map(post => {
// 			return {
// 				...post,
// 				author: 'Max'
// 			};
// 		});
// 		this.setState({ posts: updatedPosts });
// 		console.log(updatedPosts);
// 	})
// 	.catch(console.log(Error));

const Hospital = () => {
	const [inputValue, setInputValue] = useState('');
	const [outValue, setoutValue] = useState('');

	const inputHandler = event => {
		setInputValue(event.target.value);
		console.log(event.target.value);
		console.log(inputValue);
	};

	const submitHandler = event => {
		event.preventDefault();

		axios
			.get('http://localhost:5000/hospital_info/1301200010')
			.then(response => {
				//const posts = response;
				console.log(response);
				const getItme = response.data;
				var result = JSON.parse(getItme.replace(/\bNaN\b/g, 'null'));
				console.log(result);
				setoutValue(result);
				console.log(outValue);
				console.log('success');
			})
			.catch(console.log(Error));
	};

	return (
		<div>
			<div>診所代碼：</div>
			<input type="text" onChange={inputHandler}></input>
			<button type="submit" onClick={submitHandler}>
				醫療院所資訊
			</button>
			<div>醫事機構名稱:</div>
			<div>{outValue.醫事機構名稱}</div>
			<div>機構地址:</div>
			<div>{outValue.機構地址}</div>
		</div>
	);
};

export default Hospital;
