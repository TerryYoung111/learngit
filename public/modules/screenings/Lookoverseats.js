import React from "react";
import {Modal} from "antd";
export default class Lookoverseats extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var style_1 = {
			backgroundColor:"red",
			width:"30px",
			height:"30px",
			borderRadius:"10px"
		}
		var style_2 = {
			backgroundColor:"gray",
			width:"30px",
			height:"30px",
			borderRadius:"10px"
		}
		var style_3 = {
			width:"300px",
			margin:"0 auto",

		}
		let seatsvalue = this.props.seatsvalue || "[]";
		// if(seatsvalue instanceof Array){
			// seatsvalue = JSON.parse(seatsvalue);
		// }

		let trAry = [];
		for(let i = 0;i < seatsvalue.length;i++){
			let tdAry = [];
			for(let j = 0;j < seatsvalue[i].length;j++){
				if(seatsvalue[i][j] == 1){
					tdAry.push(<td style={style_2} key={`${i}_${j}`}></td>)
				}else{
				tdAry.push(<td style={style_1} key={`${i}_${j}`}></td>)
			}
		}
		trAry.push(<tr key={`${i}`}>{tdAry}</tr>)
	}

		return 	<Modal title="查看座位" visible={this.props.visible} onOk={this.props.onOk} onCancel={this.props.onCancel}>
			<table>
				<thead>
				<tr>
					<td style={style_1}></td><td>:不可选</td>
					<td style={style_2}></td><td>：可选</td>
				</tr>
				</thead>
				<tbody>
					{trAry}
				</tbody>
			</table>
		</Modal>
	}
}


