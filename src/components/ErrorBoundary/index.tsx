import React,{ErrorInfo} from 'react';
import Error from '@/pages/Exception/500';
interface ErrorBoundaryProps {
  
}
interface ErrorBoundaryState {
  hasError:boolean
}
export default class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps,ErrorBoundaryState>{
  state={
    hasError:false
  }
  componentDidCatch(error:Error, info:ErrorInfo):void {
    this.setState({ hasError: true });
    console.log(error);
    console.log(info);
  }
  render(){
    const {hasError} = this.state;
    return hasError?<Error/>:this.props.children;
  }
}