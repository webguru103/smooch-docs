import React, { Component, PropTypes } from 'react';

import Page from '../../components/Page';
import ChannelCapabilitiesGrid from '../../components/ChannelCapabilitiesGrid';

export default class ChannelCapabilities extends Component {
    static title = 'Channel Capabilities';
    static section = 'guide';

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        route: PropTypes.object.isRequired
    };

    render() {
        return <Page {...this.props}
                     className='channel-capabilities-grid-page'
                     title={ ChannelCapabilities.title }
                     section={ ChannelCapabilities.section }>
                   <div className='page-content'>
                       <ChannelCapabilitiesGrid />
                   </div>
               </Page>;
    }
}
