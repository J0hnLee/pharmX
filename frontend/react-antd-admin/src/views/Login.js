import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';

const FormItem = Form.Item;

class Login extends Component {
	state = { clientHeight: document.documentElement.clientHeight || document.body.clientHeight };
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}
	login = values => {
		localStorage.setItem('isLogin', '1');
		console.log(localStorage);
		// 模拟生成一些数据
		//this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
		localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, { role: { type: 1, name: '超级管理员' } })));
		// console.log(localStorage);
		this.props.history.push('/dashboard');
	};

	// login = e => {
	// 	e.preventDefault();
	// 	this.props.validateField((err, values) => {
	// 		if (!err) {
	// 			localStorage.setItem('isLogin', '1');
	// 			// 模拟生成一些数据
	// 			this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
	// 			localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));
	// 			this.props.history.push('/dashboard');
	// 		} else {
	// 			console.log(err);
	// 		}
	// 	});
	// };

	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize() {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	render() {
		return (
			<div className="container">
				<Particles
					height={this.state.clientHeight - 5 + 'px'}
					params={{
						number: { value: 50 },
						ize: { value: 3 },
						interactivity: {
							events: {
								onhover: { enable: true, mode: 'repulse' }
							}
						}
					}}
				/>
				<div className="content">
					<div className="title">藥局POS管理系统</div>
					<Form className="login-form">
						<FormItem name="userName" rules={[{ required: true, message: '請填寫用戶名！' }]}>
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用戶名" />
						</FormItem>
						<FormItem name="password" rules={[{ required: true, message: '請填寫密碼！' }]}>
							<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密碼" />
						</FormItem>
						<FormItem>
							<Button type="primary" htmlType="submit" block onClick={this.login}>
								登錄
							</Button>
							<div style={{ color: '#999', paddingTop: '10px', textAlign: 'center' }}>Tips : 輸入任意用戶名密碼即可</div>
						</FormItem>
					</Form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
