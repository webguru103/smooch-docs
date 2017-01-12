import React from 'react';

import Row from './Row';
import Cell from './Cell';

import { CHANNELS } from '../../data/channelCapabilities';

export default function SectionHeader({children}) {
    const style = {
        minWidth: `${225 + CHANNELS.length * 45}px`
    };

    return <Row className='grid-section-header'
                style={ style }>
               <Cell alignLeft
                     noBorder>
                   { children }
               </Cell>
           </Row>;
}
