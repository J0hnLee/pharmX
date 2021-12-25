import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, Table, Input } from 'antd';
import { useReactToPrint } from 'react-to-print';
import ParticleEffectButton from 'react-particle-effect-button';

//import { ComponentToPrint } from './ComponentToPrint';
//mport { AudioOutlined } from '@ant-design/icons';

//import "antd/dist/antd.css";
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
const { Search } = Input;
// const suffix = (
// 	<AudioOutlined
// 		style={{
// 			fontSize: 16,
// 			color: '#1890ff'
// 		}}
// 	/>
// );

const onSearch = value => console.log(value);
const dataSource = [
	{
		key: '1',
		name: '胡彦斌',
		age: 32,
		address: '西湖区湖底公园1号'
	},
	{
		key: '2',
		name: '胡彦祖',
		age: 42,
		address: '西湖区湖底公园1号'
	}
];

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: '年龄',
		dataIndex: 'age',
		key: 'age'
	},
	{
		title: '住址',
		dataIndex: 'address',
		key: 'address'
	}
];

const Hospital = () => {
	const [inputValue, setInputValue] = useState('');
	const [outValue, setoutValue] = useState('');
	const [partical, setPartical] = useState({ hidden: true });
	const [clicked, setClick] = useState({ count: 4, name: 'blue' });
	const inputHandler = event => {
		setInputValue(event.target.value);
		console.log(event.target.value);
		console.log(inputValue);
	};

	const clickHandler = () => {
		setClick(prevState => {
			console.log(clicked);
			return { ...clicked, count: prevState.count + 1 };
		});
	};

	const clickHandler2 = () => {
		console.log(partical.hidden);
		setPartical(prevState => {
			return { ...partical, hidden: true };
		});
	};

	const submitHandler = event => {
		event.preventDefault();
		//console.log('http://localhost:5000/hospital_info/'.concat(inputValue));
		axios
			.get('http://localhost:5000/hospital_info/'.concat(inputValue))
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

	const drugInfoHandler = event => {
		event.preventDefault();
		axios.get('http://127.0.0.1:8000/api/drugInfoAPI/').then(response => {
			console.log(response);
			console.log('hello');
		});
	};

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});
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

			<div>
				<Button type="primary">Primary</Button>
				<Search placeholder="input search text" enterButton="Search" size="large" onSearch={onSearch} autoSize="true" />
				<Table dataSource={dataSource} columns={columns} ref={componentRef} />
				<Button color="#121019" onClick={handlePrint}>
					Print this out!
				</Button>
				<ParticleEffectButton color="#121019" onClick={clickHandler2}>
					Print this out!
				</ParticleEffectButton>
			</div>
			<div>
				<input type="checkbox" />
				<Button type="primary">Primary</Button>
			</div>

			<div>
				<Button onClick={clickHandler}>click</Button>
				<p>{clicked.count}</p>
			</div>
			<div>
				<Button onClick={drugInfoHandler}>Get drug Info</Button>
			</div>
		</div>
	);
};

export default Hospital;
