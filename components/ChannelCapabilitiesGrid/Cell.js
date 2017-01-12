import React from 'react';

export default function Cell({className, verticalHeader, last, border, alignLeft, darkBg, isContent, divided, children}) {
    const classNames = ['grid-cell'];
    if (className) {
        classNames.push(className);
    }

    if (verticalHeader) {
        classNames.push('grid-vertical-header');
    }

    if (last) {
        classNames.push('last');
    }

    if (alignLeft) {
        classNames.push('align-left');
    }

    if (darkBg) {
        classNames.push('dark-bg');
    }

    if (border) {
        classNames.push('border');
    }

    if (isContent) {
        classNames.push('content');
    }

    if (divided) {
        classNames.push('divided');
    }

    return <div className={ classNames.join(' ') }>
               { children }
           </div>;
}
