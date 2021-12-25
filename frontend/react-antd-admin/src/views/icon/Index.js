import React from 'react';
import { message } from 'antd';
import Icon from '@ant-design/icons';
import { MessageOutlined } from '@ant-design/icons';
import StepBackwardOutlined from '@ant-design/icons';
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import '@/assets/css/app';

const Index = () => {
	let id = 0;
	let data = [
		'DownCircleTwoTone',
		'up',
		'left',
		'right',
		'down-circle',
		'up-circle',
		'left-circle',
		'right-circle',
		'login',
		'logout',
		'question',
		'question-circle',
		'plus',
		'plus-circle',
		'pause',
		'pause-circle',
		'minus',
		'minus-circle',
		'info-circle',
		'close',
		'close-circle',
		'check',
		'check-circle',
		'delete',
		'alipay-circle',
		'weibo-circle',
		'wechat',
		'alipay',
		'alert',
		'camera',
		'calendar',
		'cloud',
		'car',
		'code',
		'environment',
		'file-image',
		'file',
		'folder-add',
		'folder',
		'folder-open',
		'lock',
		'mail',
		'pay-circle',
		'star',
		'smile',
		'setting',
		'menu',
		'user'
	];
	const click = e => {
		console.log(e);
		copy(`<Icon type="${e}"/>`);
		message.success(`<Icon type="${e}"/>已复制到剪切板！`, 0.5);
	};
	const lists = [];
	for (let i = 0; i <= 10; i++) {
		//記得在JSX中使用JS變數要用花括號包著
		lists.push(
			<li>
				<MessageOutlined key={i} style={{ fontSize: '40px', color: '#08c' }} />
				<span>Hello</span>
			</li>
		);
	}

	return (
		<div className="shadow-radius">
			<div className="public-title">
				<h1>常用圖表</h1>
			</div>
			<ul className="list2">{lists}</ul>
			<ul className="list">
				{lists}
				{data.map(item => (
					<li key={id++} onClick={click.bind(this, item)}>
						<Icon type={item} />
						<span>{item}</span>
					</li>
				))}
			</ul>
			<div className="public-title" style={{ border: 0, marginBottom: 0 }}>
				<h1>
					更多圖表可以參考：
					<a target="_blank" rel="noopener noreferrer" href="https://ant.design/components/icon-cn/">
						Icon
					</a>
				</h1>
			</div>
		</div>
	);
};

export default Index;
