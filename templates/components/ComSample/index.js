import React from 'react';
import './style.scss';

export default class {{name}} extends React.PureComponent {
    render() {
        return (
            <div className="component-{{firstLettertoLowercase name}}">组件</div>
        )
    }
}

