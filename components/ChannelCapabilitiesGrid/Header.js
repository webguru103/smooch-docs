import React, { Component } from 'react';

import { CHANNELS } from '../../data/channelCapabilities';
import Cell from './Cell';
import Row from './Row';

export default class GridHeader extends Component {
    render() {
        const channelCells = CHANNELS.map((channel) => {
            return <Cell key={ channel.id }
                         noBorder>
                       <img src={ channel.icon }
                            title={ channel.name } />
                   </Cell>;
        });

        return <Row className='grid-header'>
                   <Cell verticalHeader
                         noBorder></Cell>
                   { channelCells }
               </Row>;
    }
}
