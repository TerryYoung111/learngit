import React from "react";
import {Table,Button,Pagination,Modal,Form} from "antd";
import {ajax} from "ajax";
import UpdateModal from "./UpdateModal";

class ScreeningsTable extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			visible:false,
			thisScreenings:{}
		}
		this.props.show()
	}
	handleCancel(){
		this.setState({
			visible:false
		})
	}

	del(event){
		ajax({
			type:'post',
			url:'screenings/del',
			data:{
				_id:event._id
			},
			success:function(){
				console.log("del suc");
				Modal.success({
					title:"OK",
					content:"删除成功"
				})
				this.props.show();
			}.bind(this)
		})
	}
	update(param){
		this.setState({
			visible:true,
			thisScreenings:param
		})
		console.log("修改");
		console.log(param);
	}
	render() {
		const columns =[{
			title:'影院名称',
			dataIndex:'name',
			key:'name'
		},{
			title:'地址',
			dataIndex:'addr',
			key:'addr'
		},{
			title:'联系电话',
			dataIndex:'tel', 	
			key:'tel'
		},{
			title:'操作',
			dataIndex:'action',
			key:'action',
			render:(text,record)=>{
				return <a style={{width:"200px"}}>
					<Button type="primary" onClick={()=>{this.update(record)}}>修改</Button>
					&nbsp;
					<Button type="primary" onClick={()=>{this.del(record)}}>删除</Button>
				</a>
			}
			
		}]
		const pagination = {
			total:this.state.total,
			defaultCurrent:1,
			pageSize:5,
          	showSizeChanger: true
		}

		// this.show();
		return (
			<div>
			<Table style={{width:'900px',backgroundColor:'white',marginTop:"20px"}} columns={columns} pagination={pagination} rowKey="_id"  dataSource={this.props.screeingsData} bordered></Table>
			<UpdateModal show={this.props.show} thisScreenings={this.state.thisScreenings}  handleCancel={this.handleCancel.bind(this)} visible={this.state.visible}>{this.props.children}</UpdateModal>
			</div>
		);
	}
}
 export default Form.create()(ScreeningsTable)