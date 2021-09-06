import React from 'react';
import { Tree, Input, Row, Col } from 'antd';
const { TreeNode } = Tree;

const treeData = [
	{
		title: '嬰兒用品',
		key: '440000',
		children: [
			{
				title: '奶嘴',
				key: '440300',
				children: [{ title: 'chicco', key: '440304' }, { title: 'mamaway', key: '440305' }, { title: '貝親', key: '440306' }]
			},
			{
				title: '奶瓶',
				key: '440100',
				children: [{ title: 'chicco', key: '440103' }, { title: 'mamaway', key: '440104' }, { title: '貝親', key: '440105' }]
			}
		]
	},
	{
		title: '奶粉',
		key: '430000',
		children: [
			{
				title: '鉑臻',
				key: '430100'
			},
			{
				title: '惠兒樂',
				key: '430200'
			},
			{
				title: '呵呵呵～',
				key: '430300'
			}
		]
	}
];
// 递归查找
const getKey = (title, data, arr) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i].title.indexOf(title) > -1) {
			arr.unshift(data[i].key);
			// break;
		}
		if (data[i].children && data[i].children.length > 0) {
			getKey(title, data[i].children, arr);
		}
	}
	return arr;
};

class BasicTree extends React.Component {
	state = {
		expandedKeys: [],
		searchValue: '',
		autoExpandParent: true,
		checkedKeys: []
	};
	onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};

	onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
		this.setState({ checkedKeys });
	};

	onExpand = expandedKeys => {
		this.setState({
			expandedKeys,
			autoExpandParent: false
		});
	};

	onChange = e => {
		const { value } = e.target;
		if (!value) {
			this.setState({
				expandedKeys: [],
				searchValue: '',
				autoExpandParent: false
			});
			return;
		}
		const expandedKeys = getKey(value, treeData, []);
		this.setState({
			expandedKeys,
			searchValue: value,
			autoExpandParent: true
		});
	};

	render() {
		const { searchValue, expandedKeys, autoExpandParent } = this.state;
		const loop = data =>
			data.map(item => {
				const index = item.title.indexOf(searchValue);
				const beforeStr = item.title.substr(0, index);
				const afterStr = item.title.substr(index + searchValue.length);
				const title =
					index > -1 ? (
						<span>
							{beforeStr}
							<span style={{ color: '#f50' }}>{searchValue}</span>
							{afterStr}
						</span>
					) : (
						<span>{item.title}</span>
					);
				if (item.children) {
					return (
						<TreeNode key={item.key} title={title}>
							{loop(item.children)}
						</TreeNode>
					);
				}
				return <TreeNode key={item.key} title={title} />;
			});
		return (
			<div className="shadow-radius">
				<Row gutter={16}>
					<Col span={6}>
						<Input.Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
						<Tree showLine checkable className="hide-file-icon" onSelect={this.onSelect} onCheck={this.onCheck} onExpand={this.onExpand} expandedKeys={expandedKeys} autoExpandParent={autoExpandParent}>
							{loop(treeData)}
						</Tree>
					</Col>
					<Col span={18}>
						<h4 style={{ paddingTop: 5 }}>当前选中节点的key：{this.state.checkedKeys.toString()}</h4>
					</Col>
				</Row>
			</div>
		);
	}
}

export default BasicTree;
