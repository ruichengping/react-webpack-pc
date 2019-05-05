
export interface Api{
  [propName:string]:{
    method:'get'|'post'|'delete',
    url:string
  }
}
export const ApiModel:Api= {
  fetchUserInfo:{
    method:'get',
    url:'/api/user'
  },
  fetchAuthorInfo:{
    method:'get',
    url:'/api/author'
  },
  fetchTeacherList:{
    method:'get',
    url:'/api/teacherList'
  }
}