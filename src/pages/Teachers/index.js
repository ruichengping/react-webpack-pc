import React from "react";
import { connect } from "react-redux";
import {Table,Modal,message as Message} from "antd";
import {API} from '@/api';
import Filter from './components/Filter';
import "./style.scss";

export const sexs = [
  {
    label:'男',
    value:1
  },
  {
    label:'女',
    value:2
  }
]
const sexMapper = (sex)=>{
  const selectedSex = sexs.find((item)=>item.value === sex);
  return selectedSex===undefined? '-' : selectedSex.label;
}

@connect(
  state => ({ user:state.user }),
)
export default class Teachers extends React.PureComponent {
  state={
    pageNo:1,
    pageSize:20,
    userList:[]
  }
  componentDidMount() {
    this.loadMainData(true);
  }
  //删除
  handleDelete=(row)=>{
    const {userList} = this.state;
    Modal.confirm({
      title: '确认',
      okText: '确认',
      cancelText: '取消',
      content: `确认是否删除「${row.name}」`,
      onOk:()=>{
        this.setState({
          userList:userList.filter((item)=>row.id!==item.id)
        })
      }
    });
  }
  //响应分页
  handlePageChange=(page,pageSize)=>{
    console.log(`当前页：${page}，分页大小：${pageSize}`)
  }
  //搜索
  handleSearch=(params)=>{
    console.log(params);
  }

  //拉取数据
  loadMainData(isClear){
    const {pageNo,pageSize} = this.state;
    if(isClear){
      this.setState({
        pageNo:1,
        pageSize:20
      });
    }
    API.fetchUserList({
      pageNo:isClear?1:pageNo,
      pageSize:isClear?20:pageSize
    }).then((response)=>{
      const {success,message,data} = response;
      if(success){
        this.setState({
          userList:data.data,
          total:data.total,
          pageNo:data.pageNo
        })
      }else{
        Message.error(message);
      }
    });
  }
  render() {
    const {pageNo,pageSize,userList} = this.state;
    const { user } = this.props;
    const {username} = user;
    const columns = [
      {
        key:'index',
        title: "序号",
        dataIndex: "index",
        render: (value,row,index) => (pageNo-1)*pageSize+index+1
      },
      {
        key:'name',
        title: "账户",
        dataIndex: "name",
      },
      {
        key:'age',
        title: "年龄",
        dataIndex: "age"
      },
      {
        key:'sex',
        title: "性别",
        dataIndex: "sex",
        render: (value,row,index) => sexMapper(value)
      },
      {
        key:'tel',
        title: "电话",
        dataIndex: "tel",
      },
      {
        key:'email',
        title: "邮箱",
        dataIndex: "email",
      },
      {
        key:'action',
        title: "操作",
        dataIndex: "action",
        render: (value,row,index) => <a href="javascript:;" onClick={()=>{this.handleDelete(row)}}>删除</a>
      }
    ]
    return (
      <div className="page-pageTwo" >
          <div className="user">Hello,{username}</div>
          <Filter onSearch={this.handleSearch}/>     
          <Table style={{marginTop:20}} rowKey={row=>row.id} columns={columns} dataSource={userList} pagination={{current:pageNo,pageSize,onChange:this.handlePageChange}}/>  
      </div>
    )
  }
}
