import React from "react";
import {Layout} from "antd";
const {Footer} = Layout;
export default class MyFooter extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <Footer style={{backgroundColor:'#b9b6b7'}}>
        <h1 style={{textAlign:'center'}}>用户管理系统 版权信息</h1>
    </Footer>
  }
}
