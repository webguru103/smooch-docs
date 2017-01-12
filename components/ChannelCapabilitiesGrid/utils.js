import React from 'react';

import { SUPPORT_LEVEL } from '../../data/channelCapabilities';

export function getSupportIndicator(support) {
    switch (support) {
        case SUPPORT_LEVEL.FULL:
            return <div className='cell-content image'>
                       <img src={ require('images/channels-grid/circle.svg') }
                            className='support-icon' />
                   </div>;
        case SUPPORT_LEVEL.PARTIAL:
            return <div className='cell-content image'>
                       <img src={ require('images/channels-grid/half-circle.svg') }
                            className='support-icon' />
                   </div>;
        case SUPPORT_LEVEL.NA:
            return <span className='cell-content text'>n/a</span>;
        default:
            return <span className='cell-content'></span>;
    }
}
