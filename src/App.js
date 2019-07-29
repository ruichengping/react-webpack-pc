import React from 'react';
import {Provider} from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import createRouter from '@/router';
import getStore from '@/store';
const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}
const store = getStore(window.INITIAL_STATE);
class App extends React.PureComponent{
  render(){
    return  <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>{createRouter('client')()}</Provider>
    </StyleContext.Provider>
  }
}
export default App;