import React from "react";
import {Modal,Button,Form,Input,Radio} from 'antd';
import {ajax} from 'ajax';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class UpdateModal extends React.Component{
	constructor(props){
		super(props);
		this.state={
			updatevalues:[]
		}
	}
	handleOk(){
		var values=this.props.form.getFieldsValue();
		this.setState({
			updatevalues:values
		})
		values._id=this.props.thisScreenings._id;
		console.log(values);
		ajax({
			type:'post',
			url:'screenings/update',
			data:values,
			success:function(){
				Modal.success({
						title:'OK',
						content:"修改成功"
					});

				this.props.handleCancel();
				this.props.show()
		}.bind(this)
		})
	}
	render(){
		var keys = [];
		for(var i = 1;i<=this.state.updatevalues;i++){
			keys.push(i);
		}
		console.log(keys,"keys");
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol:{span:6},
			wrapperCol:{span:9}
		}
		 const formItems = keys.map((k, index) => {
	      return (
	      	<div key={`div${k}`}>
	      		  <FormItem
	          {...formItemLayout}
	          label="放映厅"
	          required={false}
	          key={k}
	        >
	          {getFieldDecorator(`name${k}`, {
	            validateTrigger: ['onChange', 'onBlur'],
	            rules: [{
	              required: true,
	              // whitespace: true,
	              // message: "Please input passenger's name or delete this field.",
	            }],
	          })(
	            <Input placeholder="放映厅名" style={{ width: '60%', marginRight: 8 }} />
	          )}
	          <Icon
	            className="dynamic-delete-button"
	            type="minus-circle-o"
	            disabled={keys.length === 1}
            onClick={this.remove.bind(this,k)}
          />
        </FormItem>
        <FormItem
	          {...formItemLayout}
	          label="座位信息"
	          required={false}
	        >
	          {getFieldDecorator(`seats${k}`, {
	            validateTrigger: ['onChange', 'onBlur'],
	            rules: [{
	              required: true,
	              // whitespace: true,
	              // message: "Please input passenger's name or delete this field.",
	            }],
	          })(
	            <Input placeholder="座位信息" style={{ width: '80%', marginRight: 8 }} />
	          )}
	          <Icon
	            className="dynamic-delete-button"
	            type="search"
	            disabled={keys.length === 1}
            onClick={this.lookoverseats.bind(this,k)}
          />
        </FormItem>
	      	</div>
	      

      );
    });
		return (
			<div>
				<Modal title="修改" visible={this.props.visible} onCancel={this.props.handleCancel} onOk={this.handleOk.bind(this)}>
					<Form>
					<FormItem
					{...formItemLayout}
					 label="影院名称" hasFeedback>
					 {getFieldDecorator('name')
					 (<Input />)
					 }
					</FormItem>
		
					<FormItem 
					{...formItemLayout}
					label="地址" hasFeedback>
					 {getFieldDecorator('addr')
					 (<Input />)
					 }
					</FormItem>
					<FormItem
					{...formItemLayout}
					 label="联系电话" hasFeedback>
					 {getFieldDecorator('tel')
					 (<Input />)
					 }
					</FormItem>
					{formItems}
				</Form>
				
				</Modal>
				
			</div>
		
		)
	}
}
export default Form.create(
{
	 mapPropsToFields(props){
	 	return {
			name:{value:props.thisScreenings.name},
			addr:{value:props.thisScreenings.addr},
			tel:{value:props.thisScreenings.tel}

		}
	}
	
}
)(UpdateModal)