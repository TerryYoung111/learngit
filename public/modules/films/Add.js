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
let uuid = 0;
let actorData=[];
class Add extends React.Component {
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
    // componentWillReceiveProps(newProps){
      // console.log(`actors_${uuid}`,`actorHead_${uuid}`)
      // var actorName=`actors_${uuid}`;
      // var actorHead_img=`actorHead_${uuid}`;
      // console.log("uuid",actorName,actorHead_img)
      // console.log(this.props.form.getFieldsValue())
      // const {actorName,actorHead_img} = this.props.form.getFieldsValue();
      // var ary=[];
      // arr=[name:actorName,headImg:actorHead_img]
      // console.log(actorName,actorHead_img)
      // console.log("uuid",uuid)
      // console.log("newProps",newProps)
      // console.log(arr)
    // }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    //点击点击演员信息
    remove(k){
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        }
        // can use data-binding to set
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    }
    add(){
      uuid++;
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });

    }

    render() {
      const formItemLayout = {
        labelCol: { span: 4,offset: 4},
        wrapperCol: { span: 8 },
      };
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


      //点击增加演员
      const {
          getFieldDecorator,
          getFieldValue
      } = this.props.form;
      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) =>{
        return (
            <div style={{border:"1px solid white",marginTop:"20px",paddingTop:"20px"}}>
              <FormItem {...formItemLayout} label='演员名' required={false} key={k}>
                {getFieldDecorator(`actors_${k}`, {})(
                  <Input style={{ width: '60%', marginRight: 8 }} />
                )}
                <Icon className="dynamic-delete-button" type="minus-circle-o" disabled={keys.length === 1} onClick={() => this.remove(k)}/>
              </FormItem>

              <FormItem {...formItemLayout} label='演员头像' required={false}>
                {getFieldDecorator(`actorHead_${k}`, {})(
                  <Upload {...actorImg_props} className="upload-list-inline">
                    <Button>
                      <Icon type="upload" /> 上传演员头像
                    </Button>
                  </Upload>
                )}
              </FormItem>
          </div>
        );
    });



      // const checkboxOptions = ['爱情','动漫','魔幻','科幻','喜剧','剧情','战争','惊悚']
      // const { getFieldDecorator } = this.props.form;
      const { previewVisible, previewImage, fileList } = this.state;
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return <div >
        <Button type="primary" onClick={this.showModal.bind(this)}>增加</Button>
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
                          <MonthPicker format={monthFormat} />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="时长：">
                        {getFieldDecorator("time",{})(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="上映时间：">
                        {getFieldDecorator("uptime",{})(
                          <DatePicker format={dateFormat} />
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
                        <Button type="dashed" onClick={this.add.bind(this)}>
                          <Icon type="plus-square" /> 添加演员信息
                        </Button>
                      </FormItem>
                      {formItems}
                    </Form>
            </Modal>
            </div>
    }
    handleOk() {
        const {cnname,enname,year,time,uptime,uparea,intro,type,indexImg,direname} = this.props.form.getFieldsValue();
        console.log(this.props.form.getFieldsValue())
        //数组数据转换格式
        var data_indexImg=JSON.stringify(this.state.indexImgPath);
        var data_allImg=JSON.stringify(this.state.allImgPath);
        var data_directorHeadImg=JSON.stringify(this.state.director_headImgPath);
        var data_actorImg=JSON.stringify(this.state.actorImgPath);
        //标准时间转换
        var formatDate = function (date) {
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          return y + '/' + m + '/' + d;
        }
        var formatYear = function (date) {
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? '0' + m : m;
          return y + '/' + m;
        }
        ajax({
          type:'post',
          url:'/films/add',
          data:{
            cnname:cnname,
            enname:enname,
            type:type,
            year:formatYear(year._d),
            time:time,
            uptime:formatDate(uptime._d),
            uparea:uparea,
            intro:intro,
            indexImg:data_indexImg,
            allImg:data_allImg,
            director:JSON.stringify([{
              name:direname,
              headImg:data_directorHeadImg,
            }]),
          
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
          }, 1000);
    }
}
const AddForm = Form.create()(Add);
export default AddForm;
