import React from "react";
import {ajax} from "ajax";
export default class Search extends React.Component{
  constructor(props){
    super(props)
  }
  search(){
    ajax({
      type:"get",
      url:"/informations/find",
      data:{
        title:this.refs.input.value,
      },
      success:function(data){
        console.log(data);
        this.props.show(data);
      }.bind(this)
    })
  }
  render(){
    var style={
      marginBottom:"10px",
      display:"inlineBlock",
      fontSize:'16px',
    }
    return <div style={style}>
        <input ref="input" type="text" placeholder="请根据标题查找" style={{height:'30px',marginLeft:'10px',padding:'8px',fontSize:'12px'}}/>
        <input onClick={this.search.bind(this)} type="button" ref="title" value="搜索" style={{height:'30px',backgroundColor:'#108ee9',padding:'4px',border:'1px solid #108ee9',color:'white',fontSize:'14px'}}/>
    </div>
  }
}(Search)
