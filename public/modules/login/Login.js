import React from "react";
import {ajax} from "ajax";
import {Form,Input, Button,Row,Col,Modal} from "antd";
const FormItem = Form.Item;
class Login extends React.Component{
    constructor(props){
      super(props);
    }
    login(){
      this.props.form.validateFieldsAndScroll((err, values)=>{
          if (!err) {
            ajax({
              type:'get',
              url:'/users/find',
              data:{
                username:values.username,
                pwd:values.pwd,
                findType:'exact',
                addSession:1
              },
              success:function(data){
                if (data.length==1) {
                  Modal.success({
                    title: 'Success',
                    content: '登录成功！',
                  });
                  this.props.router.replace("/manage");
                }else{
                  Modal.error({
                    title: 'Error',
                    content: '用户名或密码错误！',
                  });
                }
              }.bind(this)
            })
          }
      })
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4,offset: 4},
        wrapperCol: { span: 8 },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          span: 10,
          offset: 10,
        }
      };
      return <Form style={{width:'500px',height:'300px',paddingTop:'40px',margin:'auto',marginTop:'40px',marginBottom:'40px',backgroundColor:'#ded3bb'}}>
                <FormItem>
                  <Row>
                    <Col span={4} offset={4}><h2>登录</h2></Col>
                  </Row>
                </FormItem>
                <FormItem {...formItemLayout} label="用户名：" hasFeedback>
                  {getFieldDecorator('username', {
                      rules: [{
                        required: true, message: '用户名不能为空 ',
                      }],
                    })(
                      <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="密码：" hasFeedback>
                  {getFieldDecorator('pwd', {
                      rules: [{
                        required: true, message: '密码不能为空 ',
                      }],
                    })(
                      <Input type="password"/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                  <Button type="primary" onClick={this.login.bind(this)} size="large">登录</Button>
                </FormItem>
              </Form>
    }
}
const LoginForm = Form.create()(Login);
export default LoginForm;
