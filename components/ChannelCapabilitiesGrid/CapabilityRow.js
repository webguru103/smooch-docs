import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Row from './Row';
import Cell from './Cell';

import { getSupportIndicator } from './utils';
import { CHANNELS, CAPABILITIES } from '../../data/channelCapabilities';

export default class CapabilityRow extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    generateDirectionCell() {
        const {capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        let directionCell;
        if (capabilityDetails.send && capabilityDetails.receive) {
            directionCell = <Cell className='direction-cell'
                                  divided>
                                <div className='top-part'>
                                    ⟶
                                </div>
                                <div className='bottom-part'>
                                    ⟵
                                </div>
                            </Cell>;
        } else if (capabilityDetails.send) {
            directionCell = <Cell className='direction-cell'>
                                ⟶
                            </Cell>;
        } else if (capabilityDetails.receive) {
            directionCell = <Cell className='direction-cell'>
                                ⟵
                            </Cell>;
        } else {
            directionCell = <Cell className='direction-cell'
                                  divided>
                            </Cell>;
        }

        return directionCell;
    }

    generateCells() {
        const {capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        return CHANNELS.map((channel, i) => {
            const support = channel.capabilities[capability];

            let cell;
            if (capabilityDetails.send && capabilityDetails.receive) {
                cell = <Cell key={ i }
                             divided
                             isContent>
                           <div className='top-part'>
                               { getSupportIndicator(support.send) }
                           </div>
                           <div className='bottom-part'>
                               { getSupportIndicator(support.receive) }
                           </div>
                       </Cell>;
            } else if (capabilityDetails.send) {
                cell = <Cell key={ i }
                             isContent>
                           { getSupportIndicator(support.send) }
                       </Cell>;
            } else {
                cell = <Cell key={ i }
                             isContent>
                           { getSupportIndicator(support) }
                       </Cell>;
            }

            return cell;
        });
    }


    render() {
        const {className, capability} = this.props;
        const capabilityDetails = CAPABILITIES[capability];

        const classNames = ['grid-row'];
        if (className) {
            classNames.push(className);
        }

        return <Row className={ classNames.join(' ') }>
                   <Cell verticalHeader>
                       <Cell alignLeft
                             noBorder>
                           { capabilityDetails.link ?
                                 <Link to={ capabilityDetails.link }>
                                 { capabilityDetails.name }
                                 </Link> :
                                 capabilityDetails.name }
                       </Cell>
                       { this.generateDirectionCell() }
                   </Cell>
                   { this.generateCells() }
               </Row>;
    }
}
