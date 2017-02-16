import React from "react";
export default class Search extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var style={
      marginBottom:"30px"
    }
    return <div style={style}>
        <h1>搜索</h1>
        <input ref="search" type="text"/>
        <input onClick={this.props.search} type="button" value="搜索"/>
    </div>
  }
}
