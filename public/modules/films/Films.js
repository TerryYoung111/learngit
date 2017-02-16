import React from "react";
import {ajax} from "ajax";
import Add from "./Add.js";
import Update from "./Update.js";
import {Button,Table, Icon} from "antd";
import {connect} from "react-redux";
import store from "store";
export default class Films extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      updateData:{},
    }
  }
  componentWillMount(){
    this.show();
  }

  show(){
      ajax({
        type:'get',
        url:'/users/find',
        success:function(data){
            this.setState({
              data:data
            })
            // store.dispatch({
            //   type:"SHOW_ALL_STUDENT",
            //   data:data
            // });
        }.bind(this)
      })
    }
    del(id){
      ajax({
        type:'get',
        url:'/users/del',
        data:{
          _id:id
        },
        success:function(){
          this.show();
        }.bind(this)
      })
    }
    showById(id){
      ajax({
        type:'get',
        url:'/users/find',
        data:{
          _id:id
        },
        success:function(data){
          this.setState({
            updateData:data
          })
          // store.dispatch({
          //   type:"SHOW_STUDENT",
          //   updateData:data
          // });
        }.bind(this)
      })
    }
    render(){
      const columns = [{
        title: '姓名',
        dataIndex: 'username',
        width:'25%'
      },{
        title: '邮箱',
        dataIndex: 'email',
        width:'25%'
      },{
        title: '性别',
        dataIndex: 'gender',
        width:'25%'
      },{
        title: '操作',
        dataIndex: '',
        width:'25%',
        render: (value) => <span>
            <a onClick={()=>this.showById(value._id)}>
              <Update show={this.show.bind(this)} data={this.state.updateData}></Update>
            </a>
            <Button onClick={()=>this.del(value._id)}>
              删除
            </Button>
          </span>,
      }];
      const pagination = {
          total: this.state.data.length,
          pageSize:5,
          showSizeChanger: true
        };
      return <div style={{padding:'20px 60px 0px 60px',height:'814px'}}>
          <h1 style={{marginBottom:'30px'}}>学生管理</h1>
          <Add show={this.show.bind(this)}></Add>
          <Table columns={columns} dataSource={this.state.data} pagination={pagination} style={{backgroundColor:'#d9dec3'}}></Table>
      </div>
    }
}
