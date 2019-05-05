import React, { FormEvent } from 'react';
import {Form, Input, Select, Button} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
interface FilterProps{
  onSearch:Function,
  form:any
}

export interface FilterFormData{
  name:string,
  sex:string
}
class Filter extends React.PureComponent<FilterProps>{
  //搜索
  handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    const {onSearch,form} = this.props;
    onSearch(form.getFieldsValue());
  }
  render(){
    const { getFieldDecorator} = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          {
            getFieldDecorator('name')(
              <Input placeholder="请输入" autoComplete="off"/>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('sex')(
              <Select allowClear={true} placeholder="请选择" style={{ width: 80 }}>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary"  htmlType="submit" icon="search" />
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(Filter)