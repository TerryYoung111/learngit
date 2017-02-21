import React from "react";
import {ajax} from "ajax";
import Add from "./Add.js";
import Update from "./Update.js";
import {Button,Table, Icon,Input} from "antd";
import {connect} from "react-redux";
import store from "store";
export default class Films_console extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      updateData:{},
    }
  }
  componentWillMount(){
    this.show();
    console.log(this)
  }

  show(){
      ajax({
        type:'get',
        url:'/films/find',
        success:function(data){
            this.setState({
              data:data
            })
        }.bind(this)
      })
    }
    del(id){
      ajax({
        type:'get',
        url:'/films/del',
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
        url:'/films/find',
        data:{
          _id:id
        },
        success:function(data){
          this.setState({
            updateData:data
          })
          store.dispatch({
            type:"SHOW_STUDENT",
            updateData:data
          });
        }.bind(this)
      })
    }
    render(){
      const columns = [{
        title: '首页图片',
        dataIndex: 'indexImg',
        width:100,
        height:120,
        key:'indexImg',
        render:(record)=><img style={{width:"80px",height:"100px"}} src={record}/>
      },{
        title: '电影名',
        dataIndex: 'cnname',
        width:'100px',
        height:'120px',
        key:'cnname',
      },{
        title: '英文名',
        dataIndex: 'enname',
        width:100,
        height:120,
        key:'enname',fixed: 'left'
      },{
        title: '类型',
        dataIndex: 'type',
        width:100,
        height:120,
        key:'type'
      },{
        title: '地区',
        dataIndex: 'area',
        width:100,
        height:120,
        key:'area'
      },{
        title: '年代',
        dataIndex: 'year',
        width:100,
        height:120,
        key:'year'
      },{
        title: '时长',
        dataIndex: 'time',
        width:200,
        height:120,
        key:'time'
      },{
        title: '上映时间',
        dataIndex: 'uptime',
        width:200,
        height:120,
        key:'uptime'
      },{
        title: '上映地区',
        dataIndex: 'uparea',
        width:200,
        height:120,
        key:'uparea'
      },{
        title: '简介',
        dataIndex: 'intro',
        key:'intro',
        width:150,
        render:(record)=><div style={{width:"150px",height:"110px",overflow:"hidden"}} disabled="disabled">{record}</div>
      },{
        title: '宣传图片',
        dataIndex: 'allImg',
        key:'allImg',
        width:500,
        render:(record)=>{
            var arr=[];
            for(var i=0;i<record.length;i++){
              arr.push(<img style={{width:"80px",height:"100px"}} src={record[i]}/>)
            }
          return arr
        }
      },{
        title: '导演',
        dataIndex: 'director',
        width:200,
        children:[{
          title:'姓名',
          dataIndex:'director[0].name',
          width:100,
          height:120,
          key:'director_name'
        },{
          title:'头像',
          dataIndex:'director[0].headImg',
          width:100,
          height:120,
          key:'director_headImg',
          render:(record)=><img style={{width:"80px",height:"100px"}} src={record}/>
        }],
      },{
        title: '演员',
        dataIndex: 'actor',
        key:'actor',
        width:500
      },{
        title: '操作',
        dataIndex: 'operation',
        width:200,
        height:120,
        key:'operation',
        render: (text,record,index) => (
          <span>
            <a onClick={()=>this.showById(record._id)}>
              <Update show={this.show.bind(this)} data={this.state.updateData}></Update>
            </a>
            <Button onClick={()=>this.del(record._id)}>
              删除
            </Button>
          </span>
          )
      }];
      const pagination = {
          total: this.state.data.length,
          pageSize:5,
          showSizeChanger: true
        };
      return <div style={{padding:'20px 60px 0px 60px',height:'814px'}}>
          <h1 style={{marginBottom:'30px'}}>电影管理</h1>
          <Add show={this.show.bind(this)}></Add>
          <Table columns={columns} dataSource={this.state.data} scroll={{y:240,x:1000 }}   pagination={pagination} style={{backgroundColor:'#d9dec3'}}></Table>
      </div>
    }
}
