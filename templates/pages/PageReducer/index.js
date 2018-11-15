import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import {Table,Modal} from "antd";
import * as actions  from "./redux/acitons"; 
import Filter from './components/Filter';
import "./style.scss";

const sexs = [
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
  state => ({ user:state.user,{{firstLettertoLowercase name}}:state.{{firstLettertoLowercase name}} }),
  dispatch => bindActionCreators(actions, dispatch)
)
export default class {{name}} extends React.PureComponent {
  state={
    pageNo:1,
    pageSize:20
  }
  componentDidMount() {
    this.loadMainData(true);
  }
  //删除
  handleDelete=(row)=>{
    const {deleteData} = this.props;
    Modal.confirm({
      title: '确认',
      okText: '确认',
      cancelText: '取消',
      content: `确认是否删除「${row.name}」`,
      onOk:()=>{
        deleteData(row.id);
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
    this.props.getData({
      pageNo:isClear?1:pageNo,
      pageSize:isClear?20:pageSize
    }); 
  }
  render() {
    const {pageNo,pageSize} = this.state;
    const { user,{{firstLettertoLowercase name}} } = this.props;
    const dataSource = {{firstLettertoLowercase name}}.data;
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
      <div className="page-{{firstLettertoLowercase name}}" >
          <div className="user">Hello,{username}</div>
          <Filter onSearch={this.handleSearch}/>    
          <Table style=\{{marginTop:20}} rowKey={row=>row.id} columns={columns} dataSource={dataSource} pagination=\{{current:pageNo,pageSize,onChange:this.handlePageChange}}/>  
      </div>
    )
  }
}
