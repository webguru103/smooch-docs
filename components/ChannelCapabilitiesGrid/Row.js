import React from 'react';

export default function Row({className, style, first, last, children}) {
    const classNames = ['grid-row'];
    if (className) {
        classNames.push(className);
    }

    if (first) {
        classNames.push('first');
    }

    if (last) {
        classNames.push('last');
    }

    return <div className={ classNames.join(' ') }
                style={ style }>
               { children }
           </div>;
}
