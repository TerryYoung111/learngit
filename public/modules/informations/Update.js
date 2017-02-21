import React from "react";
import {ajax} from "ajax";
import {Modal,Button,Form,Input,Select,DatePicker,Upload,Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD';




class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    handleOk() {
      const {title,date,file,informationsContent,indexImg} = this.props.form.getFieldsValue();
      console.log('const',this.props.form.getFieldsValue())
      console.log(title);
      console.log(date);
      console.log(informationsContent);
      var index_img = JSON.stringify(this.state.indexImgPath);
      console.log(index_img);
      console.log(this.props.data._id);
        ajax({
          type:"get",
          url:"/informations/update",
          data:{
            title:title,
            date:date,
            indexImg:index_img,
            informationsContent:informationsContent,
            _id:this.props.data._id
          },
          success:function(){
            // console.log("ooo");
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
        const prop = {
    		  action: '/upload',
    		  listType: 'picture',
          multiple:true,
          defaultFileList: [{
          uid: -1,
          status: 'done',
          url: "/images/"+ this.props.dataImg,
        }],
        onChange:function(data){
          // console.log("data",data);
          let fileList = data.fileList;
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
        <Button style={{float:'left'}} onClick={this.showModal.bind(this)}>修改</Button>
            <Modal
              visible={this.state.visible}
              title="修改"
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
                            <Input />
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="标题图片" hasFeedback>
                                  {getFieldDecorator('file')(
                                    <Upload {...prop}>
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
export default Form.create({
  mapPropsToFields(props){
    // this.setState=({indexImg:{value:props.data.indexImg}})
    return {
      title:{value:props.data.title},
      indexImg:{value:props.data.indexImg},
      date:{value:props.data.date},
      informationsContent:{value:props.data.informationsContent}
    };

  }
})(Update)
