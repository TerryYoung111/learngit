import React from "react";
import {Form,Input, Button,Layout,Menu, Icon } from "antd";
const { Header, Content,Footer, Sider } = Layout;
const { SubMenu } = Menu;
export default class Manage extends React.Component{
  constructor(props){
    super(props);
  }
  handleClick(e){
    this.props.router.replace(e.key);
  }
  render(){
    return <Layout>
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu onClick={this.handleClick.bind(this)}
        mode="inline"
        style={{ height: '100%' }}
      >
        <Menu.Item key='films'>
        电影管理
        </Menu.Item>
        <Menu.Item key='screenings'>
        院线管理
        </Menu.Item>
        <Menu.Item key='informations'>
        资讯管理
        </Menu.Item>
        <Menu.Item key='show'>
        热映管理
        </Menu.Item>
        <Menu.Item key='notshow'>
        待映管理
        </Menu.Item>
        <Menu.Item key='hot'>
        热播管理
        </Menu.Item>
      </Menu>
    </Sider>
        <Content>{this.props.children}</Content>
    </Layout>
  }
}
