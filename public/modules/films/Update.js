import React from "react";
import {ajax} from "ajax";
import {Modal,Button,Form,Input,Select,Checkbox,DatePicker,Upload,Icon} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const {MonthPicker,RangePicker} = DatePicker;
const monthFormat = 'YYYY/MM';
const dateFormat = 'YYYY/MM/DD';

class Update extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            indexImgList:[],
            indexImgPath:[],
            allImgList:[],
            allImgPath:[],
            director_headImgList:[],
            director_headImgPath:[],
            actorImgList:[],
            actorImgPath:[]
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
      const {cnname,enname,year,time,uptime,uparea,intro,type,indexImg,direname} = this.props.form.getFieldsValue();
      //数组数据转换格式
      var data_indexImg=JSON.stringify(this.state.indexImgPath);
      var data_allImg=JSON.stringify(this.state.allImgPath);
      var data_directorHeadImg=JSON.stringify(this.state.director_headImgPath);
      var data_actorImg=JSON.stringify(this.state.actorImgPath);
        ajax({
          type:"post",
          url:'/films/update',
          data:{
            cnname:cnname,
            enname:enname,
            type:type,
            year:year,
            time:time,
            uptime:uptime,
            uparea:uparea,
            intro:intro,
            indexImg:data_indexImg,
            allImg:data_allImg,
            director:JSON.stringify([{
              name:direname,
              headImg:data_directorHeadImg,
            }]),
            actor:data_actorImg,
            _id:this.props.data._id
          },
          success:function(){
            this.props.show();
          }.bind(this)
        })
        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, 1000);

    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    render() {
      //上传首页图片
      const indexImg_props = {
        action: '/upload',
        listType: 'picture',
        fileList:this.state.indexImgList,
        onChange:function(data){
          let fileList=data.fileList;
          let indexPath=fileList.map(function(file){
            return file.response;
          });
          this.setState({
            indexImgList:fileList,
            indexImgPath:indexPath
          })
        }.bind(this)
      };

      //上传宣传图片
      const allImg_props = {
        action: '/upload',
        listType: 'picture',
        multiple:true,
        fileList:this.state.allImgList,
        onChange:function(data){
          let fileList=data.fileList;
          let allImgPath=fileList.map(function(file){
            return file.response;
          });
          this.setState({
            allImgList:fileList,
            allImgPath:allImgPath
          })
        }.bind(this)
      };

      //上传导演头像
      const director_headImg_props = {
        action: '/upload',
        listType: 'picture',
        fileList:this.state.director_headImgList,
        onChange:function(data){
          let fileList=data.fileList;
          let director_headImgPath=fileList.map(function(file){
            return file.response;
          });
          this.setState({
            director_headImgList:fileList,
            director_headImgPath:director_headImgPath
          })
        }.bind(this)
      };

      //上传演员图片
      const actorImg_props = {
        action: '/upload',
        listType: 'picture',
        multiple:true,
        fileList:this.state.actorImgList,
        onChange:function(data){
          let fileList=data.fileList;
          let actorImgPath=fileList.map(function(file){
            return file.response;
          });
          this.setState({
            actorImgList:fileList,
            actorImgPath:actorImgPath
          })
        }.bind(this)
      };
      const formItemLayout = {
        labelCol: { span: 4,offset: 4},
        wrapperCol: { span: 8 },
      };
      const checkboxOptions = ['爱情','动漫','魔幻','科幻','喜剧','剧情','战争','惊悚'];
      const { getFieldDecorator } = this.props.form;
        return <div >
        <Button style={{float:'left'}} onClick={this.showModal.bind(this)}>修改</Button>
            <Modal
              visible={this.state.visible}
              title="修改"
              onOk={this.handleOk.bind(this)}
              onCancel={this.handleCancel.bind(this)}
              footer={[
                <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>返回</Button>,
                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>
                  提交
                </Button>,
              ]}
            >
            <Form style={{width:'480px',height:'auto',paddingTop:'40px',paddingBottom:'40px',margin:'auto',backgroundColor:'#ded3bb'}}>

                      <FormItem {...formItemLayout} label="电影名：" hasFeedback>
                          {getFieldDecorator('cnname')(
                              <Input />
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="英文名：" hasFeedback>
                          {getFieldDecorator('enname')(
                              <Input />
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="类型：">
                        {getFieldDecorator('type')(
                          <Select placeholder="请选择" multiple>
                            <Option value="爱情">爱情</Option>
                            <Option value="动漫">动漫</Option>
                            <Option value="魔幻">魔幻</Option>
                            <Option value="科幻">科幻</Option>
                            <Option value="喜剧">喜剧</Option>
                            <Option value="剧情">剧情</Option>
                            <Option value="战争">战争</Option>
                            <Option value="惊悚">惊悚</Option>
                          </Select>
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="地区：">
                        {getFieldDecorator("area",{})(
                          <Select placeholder="请选择">
                            <Option value="中国">中国</Option>
                            <Option value="日本">日本</Option>
                            <Option value="韩国">韩国</Option>
                            <Option value="中国香港">中国香港</Option>
                            <Option value="中国台湾">中国台湾</Option>
                            <Option value="美国">美国</Option>
                            <Option value="英国">英国</Option>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="年代：">
                        {getFieldDecorator("year",{})(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="时长：">
                        {getFieldDecorator("time",{})(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="上映时间：">
                        {getFieldDecorator("uptime",{})(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="上映地区：">
                        {getFieldDecorator("uparea",{})(
                          <Select placeholder="请选择">
                            <Option value="中国">中国</Option>
                            <Option value="日本">日本</Option>
                            <Option value="韩国">韩国</Option>
                            <Option value="中国香港">中国香港</Option>
                            <Option value="中国台湾">中国台湾</Option>
                            <Option value="美国">美国</Option>
                            <Option value="英国">英国</Option>
                          </Select>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="简介：">
                        {getFieldDecorator("intro",{})(
                          <Input type="textarea"></Input>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="首页图片：">
                        {getFieldDecorator("indexImg",{})(
                          <Upload {...indexImg_props} className="upload-list-inline">
                            <Button>
                              <Icon type="upload" /> 上传首页图片
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="宣传图片：">
                        {getFieldDecorator("allImg",{})(
                          <Upload {...allImg_props} className="upload-list-inline">
                            <Button>
                              <Icon type="upload" /> 上传宣传图片
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="导演：">
                        {getFieldDecorator("direname",{})(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="导演头像：">
                        {getFieldDecorator("director_headImg",{})(
                          <Upload {...director_headImg_props} className="upload-list-inline">
                            <Button>
                              <Icon type="upload" /> 上传导演头像
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="演员：">
                        {getFieldDecorator("actor",{})(
                          <Upload {...actorImg_props} className="upload-list-inline">
                            <Button>
                              <Icon type="upload" /> 上传演员图片
                            </Button>
                          </Upload>
                        )}
                      </FormItem>
                    </Form>
            </Modal>
            </div>
    }
}
export default Form.create({
  mapPropsToFields(props){
    return {
      cnname:{value:props.data.cnname},
      enname:{value:props.data.enname},
      type:{value:props.data.type},
      area:{value:props.data.area},
      year:{value:props.data.year},
      time:{value:props.data.time},
      uptime:{value:props.data.uptime},
      uparea:{value:props.data.uparea},
      intro:{value:props.data.intro}
    };
  }
})(Update)
