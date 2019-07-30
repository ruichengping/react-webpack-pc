
interface User {
  username:string
}
interface Params{
  [propName:string]:any
}
interface Author{
  info:any
}
interface State{
  user:User,
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
