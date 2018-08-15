import React from 'react';
import avtar from '../../assets/avtar.jpeg'
import BasicLayout from '@/layouts/BasicLayout';
class PageTwo extends React.PureComponent{
  render(){
    return (
      <BasicLayout>
        <div className="text-center mt-30">
          <img height="180" src={avtar}/>
        </div>
        <div className="text-center mt-30"><strong>博客地址：</strong>https://segmentfault.com/u/wuming_585cbbbfcac46/articles</div>
        <div className="text-center mt-10"><strong>github地址：</strong>https://github.com/ruichengping</div>
      </BasicLayout>
    )
  }
}
export default PageTwo;