const Mock = require('mockjs');
module.exports=Mock.mock({
  data:{
    total:5,
    pageNo:1,
    data:[ {
      id: 0,
      name: "苍老师",
      age: 29,
      sex:1,
      tel: "13051513936",
      email: "cls@dtsstackf.com"
    },{
      id: 1,
      name: "波多老师",
      age: 18,
      sex:2,
      tel: "13051513936",
      email: "yhx@dtstacks.com"
    },{
      id: 2,
      name: "小泽老师",
      age: 19,
      sex:2,
      tel: "13051513936",
      email: "yhx@dtstackt.com"
    },
    {
      id: 3,
      name: "松岛老师",
      age: 19,
      sex:2,
      tel: "13051513936",
      email: "yhx@dtstackt.com"
    },{
      id: 4,
      name: "大桥老师",
      age: 19,
      sex: 1,
      tel: "13051513936",
      email: "yhx@dtstackt.com"
    }]
  },
  success: true,
  result_code: 1,
  message: "执行成功"
})