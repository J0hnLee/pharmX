import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
class EditForm extends Component {
	componentWillReceiveProps(nextProps) {
		!nextProps.visible && this.props.form.resetFields();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { data } = this.props;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20 }
		};
		const formTailLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 20, offset: 4 }
		};
		return (
			<Form onSubmit={this.handleSubmit} refs="editForm">
				<Form.Item label="姓名" {...formItemLayout} initialValue={data.name} rules={[{ required: true, message: '请输入姓名' }]}>
					<Input />
				</Form.Item>
				<Form.Item label="年齡" {...formItemLayout} initialValue={data.age} rules={[{ required: true, message: '請輸入年齡' }]}>
					<Input />
				</Form.Item>
				{/* <Form.Item label="郵箱" {...formItemLayout}>
					{getFieldDecorator('email', {
						initialValue: data.email,
						rules: [
							{
								required: true,
								message: '請輸入正確郵箱',
								pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
							}
						]
					})(<Input />)}
				</Form.Item> */}
				<Form.Item label="郵箱" {...formItemLayout} name="email" rules={[{ required: true, message: '請輸入正確郵箱', pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ }]} initialValue={data.email}>
					<Input />
				</Form.Item>

				<Form.Item {...formTailLayout}>
					<Button type="primary" onClick={this.props.handleSubmit}>
						提交
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
export default EditForm;
