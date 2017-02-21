import React from "react";
import {ajax} from "ajax";
import {Modal,Button,Form,Input,Select,DatePicker,Upload,Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';



class Add extends React.Component {
    constructor(props) {
        super(props);
		this.state={
			      loading: false,
            visible: false,
            indexImgList:[],
            indexImgPath:[]
		}
      }

    showModal() {
        this.setState({
            visible: true,
        });
    }
    date2str(x,y) {
    var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
    y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2)});
    return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length)});
    }
    handleOk() {
		const {title,date,file,informationsContent,indexImg} = this.props.form.getFieldsValue();

    var index_img = JSON.stringify(this.state.indexImgPath);
		// console.log(this.props.form.getFieldsValue().informationsContent)
		// console.log("文件",date._d);
    console.log(index_img)
    var myDate = this.date2str(date._d,"yyyy/MM/dd");
        ajax({
          type:'post',
          url:'/informations/add',
          data:{
            title:title,
            date:myDate,
            informationsContent:informationsContent,
            indexImg:index_img
          },
          success:function(){
            this.props.show();
          }.bind(this)
        })
    setTimeout(() => {
        this.setState({
            loading: false,
            visible: false
        });
      }, 500);
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    render() {
	  const props = {
		  action: '/upload',
		  listType: 'picture',
      multiple:true,
      fileList:this.state.indexImgList,
      onChange:function(data){
        // console.log("data",data)
          let fileList = data.fileList;
          // console.log("filedList",filedList)
          let indexPath = fileList.map(function(file){
            console.log("file",file)
            return file.response;
        });
        this.setState({
          indexImgList:fileList,
          indexImgPath:indexPath
        })
      }.bind(this)
		};
      const formItemLayout = {
        labelCol: { span: 4,offset: 4},
        wrapperCol: { span: 8 },
      };
      const { getFieldDecorator } = this.props.form;
        return <div >
        <Button type="primary" onClick={this.showModal.bind(this)} style={{display:'inlineBlock',float:'left'}}>增加</Button>
            <Modal
              visible={this.state.visible}
              title="增加"
              onOk={this.handleOk.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>Return</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                  Submit
                </Button>,
              ]}
            >
            <Form style={{width:'480px',height:'auto',paddingTop:'40px',margin:'auto',backgroundColor:'#ded3bb'}}>

                      <FormItem {...formItemLayout} label="标题" hasFeedback>
                      {getFieldDecorator('title')(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="日期" hasFeedback>
                        {getFieldDecorator('date')(
                							<DatePicker
                						  showTime
                						  format={dateFormat}
                						  placeholder="Select Time"
                						/>
                          )}
                      </FormItem>
          					  <FormItem {...formItemLayout} label="标题图片" hasFeedback>
                                  {getFieldDecorator('file')(
                                      <Upload {...props}>
                        							  <Button>
                        								<Icon type="upload" /> upload
                        							  </Button>
                        							</Upload>
                          )}
                      </FormItem>
					            <FormItem {...formItemLayout} label="内容" hasFeedback>
                        {getFieldDecorator('informationsContent')(
                            <Input type='textarea' />
                          )}
                      </FormItem>
                    </Form>
            </Modal>
            </div>
    }
}
const AddForm = Form.create()(Add);
export default AddForm;
