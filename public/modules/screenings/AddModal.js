import React from "react";
import {Modal,Button,Form,Input,Radio,Icon,Table} from 'antd';
import {ajax} from 'ajax';
let uuid = 0;
import Lookoverseats from "./Lookoverseats";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddModal extends React.Component{
	constructor(props){
		super(props);

		this.state={
			visible:false,
			value:"女",
			visible2:false,
			seatsvalue:[]
		}
	}
	add(){
		console.log('增加');
		this.setState({
			visible:true
		})
	}
	handleOk2(){
		this.setState({
			visible2:false
		});
	}
	handleCancel2(){
	this.setState({
			visible2:false
		});	
	}
	handleok(){
		var rooms = [];

		const { form } = this.props;
		form.validateFields((err,values)=>{
			for(var i=1;i<=uuid;i++){
				var room = {};
				room.name = form.getFieldValue(`name${i}`);
				room.seats = JSON.parse(form.getFieldValue(`seats${i}`));
				rooms.push(room);
				delete values[`name${i}`];
				delete values[`seats${i}`];
			}
			console.log(values);
			values.rooms = JSON.stringify(rooms);
			ajax({
				type:'post',
				url:'screenings/add',
				data:values,
				success:function(){
					console.log('add suc');
					this.props.show()
				}.bind(this)
			})

		})
		this.setState({
			visible:false
		});
	}
	handleCancel(){
		console.log('handleCancel');
		this.setState({
			visible:false
		})
	}
	onChange(event){
		this.setState({
			value:event.target.value
		})
	}

  	addRoom(){
  		console.log('增加放映厅');
	    uuid++;
	    const { form } = this.props;
	    const keys = form.getFieldValue('keys');
	    const nextKeys = keys.concat(uuid);
	    form.setFieldsValue({
	      keys: nextKeys,
	    });


 	 }
 	remove(k){
	 	console.log("删除项目");
	    const { form } = this.props;
	    const keys = form.getFieldValue('keys');
	    if (keys.length === 1) {
	      return;
	    }
	    form.setFieldsValue({
	      keys: keys.filter(key => key !== k),
	    });
  }
  lookoverseats(index){

  	var seats = this.props.form.getFieldValue(`seats${index}`);
  	if(JSON.parse(seats) instanceof Array){
  	var newseats = JSON.parse(seats);
  	console.log(newseats);
  	this.setState({
		visible2:true,
		seatsvalue:newseats
	})


	};


  }
	render(){
		const {getFieldDecorator} = this.props.form;
		const { getFieldsValue,getFieldValue} = this.props.form;
		const formItemLayout = {
			labelCol:{span:6},
			wrapperCol:{span:9}
		};

		 const formItemLayoutWithOutLabel = {
	      wrapperCol: { span: 20, offset: 4 },
	    };


	    getFieldDecorator('keys', { initialValue: [] });
	    getFieldDecorator('rooms', { initialValue: "" });
	    const keys = getFieldValue('keys');
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
				<Button type="primary" onClick={this.add.bind(this)}>增加</Button>
				<Modal title="增加" ref="son" test="test" visible={this.state.visible} onOk={this.handleok.bind(this)} onCancel={this.handleCancel.bind(this)}>

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
					<FormItem>
						<Button onClick={this.addRoom.bind(this)} type="dashed" style={{marginLeft:165}}>增加放映厅</Button>
					</FormItem>

					
					
				</Form>
					
				</Modal>

				<Lookoverseats seatsvalue={this.state.seatsvalue} visible={this.state.visible2} onOk={this.handleOk2.bind(this)} onCancel={this.handleCancel2.bind(this)}>
					{this.state.addtable}

				</Lookoverseats>
			</div>
		
		)
	}
}
export default Form.create()(AddModal)