import React from "react";
import {ajax} from "ajax";
import {Layout,Row,Col,Menu, Icon,Tag} from "antd";
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
export default class MyHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user:{}
    }
  }
  handleClick(e){
    this.props.router.replace(e.key);
  }
  componentWillMount(){
    this.getSession();
  }
 componentWillReceiveProps(){
    this.getSession();
  }
  getSession(){
    ajax({
      type:'get',
      url:'/getSession',
      success:function(data){
        this.setState({
          user:data
        })
      }.bind(this)
    })
  }
  logout(){
    ajax({
      type:'get',
      url:'/logout',
      success:function(){
        this.setState({
          user:{}
        })
        this.props.router.replace("/login")
      }.bind(this)
    })
  }
  render(){
    var info;
    var loginDisabled = false;
    var manageDisabled = false;
    if (this.state.user.username) {
      loginDisabled = true;
      info= <span><span style={{fontSize:'14px',color:'white'}}>{this.state.user.username}</span> <Tag onClick={this.logout.bind(this)} color="purple"><Icon type="logout" />注销</Tag></span>
    }else{
      manageDisabled = true;
      info= <span></span>
    }
    return <Header style={{backgroundColor:'#454d4c'}}>
      <Row>
        <Col span={12} push={1}><h1 style={{color:'white'}}>LOGO</h1></Col>
        <Col span={5} offset={4}>
          <Menu onClick={this.handleClick.bind(this)} mode="horizontal" style={{height:'65px',lineHeight:'64px',color:'white',backgroundColor:'#454d4c'}}>
            <Menu.Item key="login" disabled={loginDisabled}>
              <Icon type="user"/>登录
            </Menu.Item>
            <Menu.Item key="manage" disabled={manageDisabled}>
              <Icon type="github" />管理
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3}>
            {info}
        </Col>
      </Row>
    </Header>

  }
}
