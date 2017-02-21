import React from "react";
import {ajax} from "ajax";
import Add from "./Add.js";
import Update from "./Update.js";
import Search from "./Search.js";
import {Button,Table, Icon} from "antd";


export default class Informations extends React.Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      updateData:{},
      dataImg:[]
    }
  }
  componentWillMount(){
    this.show();
  }
  show(sea){
    if(sea!=null){
      this.setState({
        data:sea
      })
      sea = null;
    }else{
      ajax({
        type:'get',
        url:'/informations/find',
        success:function(data){
            this.setState({
              data:data,
            })
        }.bind(this)
      })
    }

    }
    del(id){
      ajax({
        type:'get',
        url:'/informations/del',
        data:{
          _id:id
        },
        success:function(){
          this.show();
        }.bind(this)
      })
    }
    showById(id){
      console.log(id);
      ajax({
        type:'get',
        url:'/informations/find',
        data:{
          _id:id
        },
        success:function(data){
          console.log(data);
          console.log('data',data);

          var c=data.indexImg[0].split('\\');
          console.log('c',c);

          this.setState({
            updateData:data,
            dataImg:c[1]
          })
        }.bind(this)
      })
    }
    render(){
      const columns = [{
        title: '标题',
        dataIndex: 'title',
		    height:'30px',
        width:'20%'
      },{
        title: '日期',
        dataIndex: 'date',
		    height:'30px',
        width:'20%'
      },{
        title: '标题图片',
        dataIndex: 'indexImg',
		    height:'30px',
        width:'20%',
        render:(record) => <img style={{width:'60px',height:'80px'}} src={record} />
      },{
        title: '内容',
        dataIndex: 'informationsContent',
        width:'20%',
		    height:'30px'
      }
	  ,{
        title: '操作',
        dataIndex: '',
        width:'20%',
		height:'30px',
        render: (value) => <span>
            <a onClick={()=>this.showById(value._id)}>
              <Update show={this.show.bind(this)} dataImg={this.state.dataImg} data={this.state.updateData}></Update>
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
          <h1 style={{marginBottom:'30px'}}>资讯管理</h1>
    		  <Add show={this.show.bind(this)} style={{display:"inlineBlock"}}></Add>
          <Search show={this.show.bind(this)}></Search>
    		  <Table columns={columns} dataSource={this.state.data} pagination={pagination} style={{backgroundColor:'#d9dec3'}}></Table>
      </div>
    }
}
