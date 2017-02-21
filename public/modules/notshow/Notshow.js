import React from "react";
import {ajax} from "ajax";
import {Button,Table, Icon} from "antd";
import Add from "./Add";
export default class Notshow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data:[],
      selectedRowKeys:[]
    }
  }
  componentWillMount(){
    this.show();
  }
  show(){
    ajax({
      type:"get",
      url:"/notshow/find",
      data:{
        submitType:"findJoin",
        ref:"films"
      },
      success:function(data){
        this.setState({
          data:data
        })
      }.bind(this)
    })
  }
  del(){
    ajax({
      type:"post",
      url:"/notshow/del",
      data:{
        ids:JSON.stringify(this.state.selectedRowKeys)
      },
      success:function(){
        this.show();
      }.bind(this)
    })
  }
  render(){
    const columns = [{
      title:'图片',
      dataIndex:'',
      render: (record) => {
        return <img style={{width:"40px",height:"60px"}} src = {record.films.indexImg}/>
      }
    },{
      title: '中文名',
      dataIndex: 'films.cnname',
      width:"10%"
    },{
      title: '英文名',
      dataIndex: 'films.enname',
      width:"10%"
    },{
      title: '类型',
      dataIndex: 'films.type',
      width:"5%"
    },{
      title:"区域",
      dataIndex:"films.area",
      width:"5%"
    },{
      title:"年代",
      dataIndex:"films.year",
      width:"5%"
    },{
      title:"时长",
      dataIndex:"films.time",
      width:"7%"
    },{
      title:"上映时间",
      dataIndex:"films.uptime",
      width:"8%"
    },{
      title:"上映地区",
      dataIndex:"films.uparea",
      width:"7%"
    },{
      title:"票房",
      dataIndex:"films.boxOffice",
      width:"4%"
    },{
      title:"剧情简介",
      dataIndex:"films.intro",
      width:"40%"
    }];
    const pagination = {
      total: this.state.data.length,
      pageSize:5
    };
    const rowSelection = {
      onChange:function(selectedRowKeys){
        this.setState({
          selectedRowKeys:selectedRowKeys
        })
      }.bind(this)
    }
    return <div style={{padding:'20px 60px 0px 60px',height:'814px'}}>
        <h1 style={{marginBottom:'30px'}}>待映管理</h1>
        <Add show={this.show.bind(this)} data = {this.state.data}></Add>
        <Button type="primary" onClick={this.del.bind(this)}>删除</Button>
        <Table columns = {columns} dataSource={this.state.data}
         rowKey={record => record._id} rowSelection={rowSelection}
          pagination={pagination} bordered={true} style={{backgroundColor:'#d9dec3'}}></Table>
    </div>
  }
}
