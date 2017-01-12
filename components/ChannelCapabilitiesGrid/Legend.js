import React from 'react';

import Row from './Row';
import Cell from './Cell';

import { getSupportIndicator } from './utils';
import { SUPPORT_LEVEL } from '../../data/channelCapabilities';

export default function Legend() {
    return <Row className='legend'>
               <Cell>
                   { getSupportIndicator(SUPPORT_LEVEL.FULL) } Full channel support
               </Cell>
               <Cell>
                   { getSupportIndicator(SUPPORT_LEVEL.PARTIAL) } Partial channel support
               </Cell>
               <Cell>
                   { getSupportIndicator(SUPPORT_LEVEL.NA) } Not applicable or not natively supported on channel
               </Cell>
               <Cell>
                   <div className='cell-content text'>⟶</div> Send
               </Cell>
               <Cell>
                   <div className='cell-content text'>⟵</div> Receive
               </Cell>
           </Row>;
}
