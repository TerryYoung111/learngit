import React from "react";
import {Layout,Menu,Button,Icon,Input} from "antd";
import ScreeningsTable from "./ScreeningsTable";
import AddModal from "./AddModal";
import {ajax} from "ajax";
const {Sider,Content} = Layout;
const Search = Input.Search;
class Screenings extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:{
				screeingsData:[]
			},nowpage:""
		}
	}
	 componentWillMount(){
        this.show();
    }
    search(value){
		console.log(value)
		ajax({
			type:'get',
			url:'/screenings/find',
			data:{
				name:value
			},
			success:function(data){
				console.log(data)
				 this.setState({
	              	data:data
	            })
          		this.show();
			}.bind(this)
		})
	}
	show(page,rows){
		ajax({
			type:"get",
			url:"screenings/find",
			data:{
				// page:page,rows:5
			},
			success:function(data){
				this.setState({
					data:{
						screeingsData:data,
					}
				})
			}.bind(this)
		})
	}
	render(){
		return(
				<Layout>
					
					<div style={{paddingLeft:"90px"}}>
						<div>
							<h1  style={{ marginBottom:30}}>院线管理</h1>
							<AddModal show={this.show.bind(this)}></AddModal>
							<Search placeholder="请输入影院名称" style={{marginTop:30 , width: 200 ,marginBottom:30}} onSearch={this.search.bind(this)}/>
						</div>

						<ScreeningsTable show={this.show.bind(this)} screeingsData={this.state.data.screeingsData}>
							{this.props.children}
						</ScreeningsTable>
						
					</div>
				</Layout>
		)
	}
}
export {Screenings as default}