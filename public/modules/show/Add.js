import React from "react";
import {ajax,hasValue} from "ajax";
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
          url:'/show/del',
          success:function(){
            ajax({
              type:"post",
              url:'/show/add',
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
          onChange:function(selectedRowKeys){
            var showDataArr = this.props.data.map(function(value){
              return {
                films:{
                  $ref:"films",
                  $id:value.films._id
                }
              }
            })

            for (var i = 0; i < selectedRowKeys.length; i++) {
              if (hasValue(showDataArr,selectedRowKeys[i],"$id") == -1) {
                showDataArr.push({
                  films:{
                    $id:selectedRowKeys[i],
                    $ref:"films"
                  }
                })
              }
            }
            this.setState({
              addData:showDataArr
            })
          }.bind(this)
          // getCheckboxProps: record => {
          //     console.log(record.cnname)
          //     console.log(this.props.data);
          //     return {disabled : true}
          //   }
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
