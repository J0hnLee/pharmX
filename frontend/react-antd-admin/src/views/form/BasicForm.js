import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const { Option } = Select;

const residences = [
	{
		value: 'zhejiang',
		label: 'Zhejiang',
		children: [
			{
				value: 'hangzhou',
				label: 'Hangzhou',
				children: [
					{
						value: 'xihu',
						label: 'West Lake'
					}
				]
			}
		]
	},
	{
		value: 'jiangsu',
		label: 'Jiangsu',
		children: [
			{
				value: 'nanjing',
				label: 'Nanjing',
				children: [
					{
						value: 'zhonghuamen',
						label: 'Zhong Hua Men'
					}
				]
			}
		]
	}
];

class BasicForm extends React.Component {
	state = {
		confirmDirty: false
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: {
				sm: { span: 9 }
			},
			wrapperCol: {
				sm: { span: 6 }
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				sm: {
					span: 9,
					offset: 9
				}
			}
		};
		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '86'
		})(
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		);

		return (
			<div className="shadow-radius">
				<div className="public-title">
					<h1>註冊表單</h1>
					<h1>
						更多表單參考：
						<a target="_blank" href="https://ant.design/components/form-cn/" rel="noopener noreferrer">
							Form{' '}
						</a>
					</h1>
				</div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Form.Item label="郵箱">
						{getFieldDecorator('email', {
							rules: [
								{
									type: 'email',
									message: '請輸入正確郵箱！'
								},
								{
									required: true,
									message: '請輸入郵箱！'
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="密碼" hasFeedback>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: '請輸入密碼!'
								},
								{
									validator: this.validateToNextPassword
								}
							]
						})(<Input.Password />)}
					</Form.Item>
					<Form.Item label="確認密碼" hasFeedback>
						{getFieldDecorator('confirm', {
							rules: [
								{
									required: true,
									message: '請確認密碼!'
								},
								{
									validator: this.compareToFirstPassword
								}
							]
						})(<Input.Password onBlur={this.handleConfirmBlur} />)}
					</Form.Item>
					<Form.Item
						label={
							<span>
								暱稱&nbsp;
								<Tooltip title="你希望別人叫你什麼?">
									<Icon type="question-circle-o" />
								</Tooltip>
							</span>
						}
					>
						{getFieldDecorator('nickname', {
							rules: [{ required: true, message: '請輸入暱稱!', whitespace: true }]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="居住地">
						{getFieldDecorator('residence', {
							initialValue: ['zhejiang', 'hangzhou', 'xihu'],
							rules: [{ type: 'array', required: true, message: '請選擇居住地！' }]
						})(<Cascader options={residences} />)}
					</Form.Item>
					<Form.Item label="手機號碼">
						{getFieldDecorator('phone', {
							rules: [{ required: true, message: '請輸入手機號碼！' }]
						})(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
					</Form.Item>
					<Form.Item label="驗證碼" extra="我們必須確認你不是機器人.">
						<Row gutter={8}>
							<Col span={12}>
								{getFieldDecorator('captcha', {
									rules: [{ required: true, message: '請輸入驗證碼！' }]
								})(<Input />)}
							</Col>
							<Col span={12}>
								<Button>獲取驗證碼</Button>
							</Col>
						</Row>
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						{getFieldDecorator('agreement', {
							valuePropName: 'checked'
						})(
							<Checkbox>
								我已經閱讀過 <a href="#/agreement">協議</a>
							</Checkbox>
						)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							註冊
						</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}
export default Form.create()(BasicForm);
