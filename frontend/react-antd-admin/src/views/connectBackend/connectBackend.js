import React, { Component } from 'react';
//import axios from 'axios';
import GetBackend from './getBackend';
// const Aux =(prop)=>{
//     return (
//         <div>prop.title</div>
//     )
// }

class ConnectBackend extends Component {
	render() {
		return (
			<div>
				<div>Hello</div>
				<div>
					<GetBackend />
				</div>
			</div>
		);
	}
}

export default ConnectBackend;
