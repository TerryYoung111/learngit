import React from "react";
import {ajax} from "ajax";
import {Modal,Button,Form,Input,Select,Table} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            filmsData:[],
            addData:[]
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
        this.showFilms();
    }
    handleOk() {
      console.log(this.state.addData);
        ajax({
          type:'post',
          url:'/notshow/del',
          success:function(){
            ajax({
              type:"post",
              url:'/notshow/add',
              data:{
                submitType:"addMore",
                data:JSON.stringify(this.state.addData)
              },
              success:function(){
                this.props.show();
              }.bind(this)
            })
          }.bind(this)
        })
      setTimeout(() => {
          this.setState({
              loading: false,
              visible: false
          });
        }, 1000);
      }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    showFilms(){
      ajax({
        type:"get",
        url:"/films/find",
        success:function(data){
          this.setState({
            filmsData:data
          })
        }.bind(this)
      });
    }
    render() {
      const columns=[{
        title:'图片',
        dataIndex:'',
        render: (record) => {
          return <img style={{width:"40px",height:"60px"}} src = {record.indexImg}/>
        }
      },{
        title: '中文名',
        dataIndex: 'cnname',
        width:"40%"
      },{
        title: '英文名',
        dataIndex: 'enname',
        width:"40%"
      }];
      const pagination = {
          total: this.state.filmsData.length,
          pageSize:5,
          showSizeChanger: true
        };
      const rowSelection = {
          getCheckboxProps:record =>({
            defaultValue: record._id = this.state.filmsData._id
          }),
          onChange:function(selectedRowKeys){
            var arr = [];
            ajax({
              type:"get",
              url:"/notshow/find",
              success:function(data){
                arr = data;
              }
            })
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < selectedRowKeys.length; j++) {
                  if (arr[i].films._id == selectedRowKeys[j]) {
                    arr.splice(i,1);
                  }
                }
            }
            for (var m = 0; m < selectedRowKeys.length; m++) {
              arr.push({
                films:{
                  $id:selectedRowKeys[m],
                  $ref:"films"
                }
              })
              console.log("添加后",arr);

            }
            this.setState({
              addData:arr
            })
          }.bind(this)
        }
      return <div>
        <Button type="primary" onClick={this.showModal.bind(this)}  style={{float:"left",marginRight:"10px"}}>增加</Button>
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
            <Table rowSelection={rowSelection} columns={columns} rowKey={record => record._id} dataSource={this.state.filmsData} pagination={pagination}></Table>
            </Modal>
            </div>
    }
}
const AddForm = Form.create()(Add);
export default AddForm;
