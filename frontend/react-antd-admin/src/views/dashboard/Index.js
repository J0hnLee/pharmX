import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Index extends Component {
	render() {
		return (
			<div className="shadow-radius">
				<div>
					<h1>這是一個通用的後台管理系統，由 react+react-router+react-redux+antd 開發。</h1>
					<p>基本功能包含：登陸、登出、數據儲存、路由權限控制、Echarts、數據表格等，UI採用混合風格包含 material UI, Ant Design</p>
					<p>後端API採用graphQL ,airflow 定期抓取線上資料</p>
				</div>
				<div className="App">
					<h1>處方系統</h1>
					<button onClick={() => this.props.history.push('/personInfo')}>處方系統</button>
				</div>
			</div>
		);
	}
}

export default withRouter(Index);
