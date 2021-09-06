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
				// for (var ele in getItme) {
				// 	console.log(ele);
				// }
				// getItme.map(post => {
				// 	return decodeURIComponent(post);
				// });
				var testEle = {
					'\u5206\u5340\u5225': '1',
					'\u578b\u614b\u5225': '1',
					'\u6a5f\u69cb\u5730\u5740': '\u81fa\u5317\u5e02\u6587\u5c71\u5340\u8208\u9686\u8def3\u6bb5111\u865f',
					'\u7279\u7d04\u985e\u5225': '1',
					'\u7d42\u6b62\u5408\u7d04\u6216\u6b47\u696d\u65e5\u671f': 'NaN',
					'\u91ab\u4e8b\u6a5f\u69cb\u4ee3\u78bc': '1301200010',
					'\u91ab\u4e8b\u6a5f\u69cb\u540d\u7a31': '\u81fa\u5317\u5e02\u7acb\u842c\u82b3\u91ab\u9662\uff0d\u59d4\u8a17\u8ca1\u5718\u6cd5\u4eba\u81fa\u5317\u91ab\u5b78\u5927\u5b78\u8fa6\u7406',
					'\u91ab\u4e8b\u6a5f\u69cb\u7a2e\u985e': 'A',
					'\u958b\u696d\u72c0\u6cc1': '0',
					'\u96fb\u8a71\u5340\u57df\u865f\u78bc ': '2.0',
					'\u96fb\u8a71\u865f\u78bc': '29307930'
				};
				var sles = getItme.split(',');
				// var qql = sles.map(sle => {
				// 	return decodeURIComponent(sles.split(':')[0]);
				// });
				console.log(sles[0] + 'helo');
				var kk = sles[2].split(':')[0].toString();
				console.log(kk.type);
				console.log(decodeURI(sles[2].split(':')[0]));
				console.log(decodeURI(kk));
				//console.log(JSON.parse();
				// for (var prop in posts) {
				// 	alert('Key:' + prop);
				// 	alert('Value:' + posts[prop]);
				// }

				// posts.map(post => {
				// 	return post.toJSON;
				// });

				console.log('success');
				// console.log(posts);
				// setoutValue(posts);
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
			<div>{outValue}</div>
		</div>
	);
};

export default Hospital;
