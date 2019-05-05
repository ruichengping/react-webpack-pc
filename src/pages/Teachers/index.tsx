import React from "react";
import { connect } from "react-redux";
import {Table,Modal,message as Message} from "antd";
import {API} from '@/api';
import Filter,{FilterFormData} from './components/Filter';
import "./style.scss";

export const sexs:Options = [
  {
    label:'男',
    value:1
  },
  {
    label:'女',
    value:2
  }
]
const sexMapper = (sex:string)=>{
  const selectedSex = sexs.find((item)=>item.value === sex);
  return selectedSex===undefined? '-' : selectedSex.label;
}

interface TeachersProps{
  user:User
}
interface TeachersState{
  pageNo:number,
  pageSize:number,
  total:number,
  teacherList:{
    id: number,
    name: string,
    age: number,
    sex: number,
    tel: string,
    email: string
  }[]
}
interface TeacherItem  {
  id: number,
  name: string,
  age: number,
  sex: number,
  tel: string,
  email: string
}

const initialState = {
  pageNo:1,
  pageSize:20,
  total:0,
  teacherList:[]
}

@connect(
  (state:State) => ({ user:state.user }),
)
export default class Teachers extends React.PureComponent<TeachersProps,TeachersState> {
  readonly state = initialState
  componentDidMount() {
    this.loadMainData(true);
  }
  //删除
  handleDelete=(row:TeacherItem)=>{
    const {teacherList} = this.state;
    Modal.confirm({
      title: '确认',
      okText: '确认',
      cancelText: '取消',
      content: `确认是否删除「${row.name}」`,
      onOk:()=>{
        this.setState({
          teacherList:teacherList.filter((item)=>row.id!==item.id)
        })
      }
    });
  }
  //响应分页
  handlePageChange=(page:number,pageSize:number)=>{
    console.log(`当前页：${page}，分页大小：${pageSize}`)
  }
  //搜索
  handleSearch=(params:FilterFormData)=>{
    console.log(params);
  }

  //拉取数据
  loadMainData(isClear:boolean){
    const {pageNo,pageSize} = this.state;
    if(isClear){
      this.setState({
        pageNo:1,
        pageSize:20
      });
    }
    API.fetchTeacherList({
      pageNo:isClear?1:pageNo,
      pageSize:isClear?20:pageSize
    }).then((response:HttpResponse<any>)=>{
      const {success,message,data} = response;
      if(success){
        this.setState({
          teacherList:data.data,
          total:data.total,
          pageNo:data.pageNo
        })
      }else{
        Message.error(message);
      }
    });
  }
  render() {
    const {pageNo,pageSize,teacherList} = this.state;
    const { user } = this.props;
    const {username} = user;
    const columns = [
      {
        key:'index',
        title: "序号",
        dataIndex: "index",
        render: (value:any,row:TeacherItem,index:number) => (pageNo-1)*pageSize+index+1
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
        render: (value:any,row:TeacherItem,index:number) => sexMapper(value)
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
        render: (value:any,row:TeacherItem,index:number) => <a href="javascript:;" onClick={()=>{this.handleDelete(row)}}>删除</a>
      }
    ]
    return (
      <div className="page-pageTwo" >
          <div className="user">Hello,{username}</div>
          <Filter onSearch={this.handleSearch}/>     
          <Table style={{marginTop:20}} rowKey={(row:TeacherItem):string=>row.id+''} columns={columns} dataSource={teacherList} pagination={{current:pageNo,pageSize:(pageSize as number),onChange:this.handlePageChange}}/>  
      </div>
    )
  }
}
