import React from "react";
import MyHeader from "./Header";
import MyFooter from "./Footer";
import {Layout} from "antd";
const { Header, Content,Footer, Sider } = Layout;
import ajax from "ajax";
export default class MainPage extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <Layout>
        <MyHeader router={this.props.router}></MyHeader>
        <Content> {this.props.children}</Content>
        <MyFooter></MyFooter>
    </Layout>
  }
}
