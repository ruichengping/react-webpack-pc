
import React from 'react';
import {Link} from 'react-router-dom';
import Exception from '@/components/Exception';

export default () => (
  <Exception
    type="500"
    desc="抱歉，服务器出错了"
    linkElement={Link}
    backText="返回首页"
  />
);;