
interface Global {
  userInfo:any
}
interface Params{
  [propName:string]:any
}
interface Author{
  info:any
}
interface State{
  global:Global,
  author:Author
}

type Options = {
  label:string,
  value:string|number
}[]

interface HttpResponse<D> {
  success:boolean,
  data:D,
  message:string
}
