import React, { Component } from 'react';

import Header from './Header';
import SectionHeader from './SectionHeader';
import CapabilityRow from './CapabilityRow';
import Legend from './Legend';


export default class ChannelCapabilitiesGrid extends Component {
    generateRows(capabilities) {
        return capabilities.map((c) => {
            return <CapabilityRow key={ c }
                                  capability={ c } />;
        });
    }

    render() {
        return <div className='channel-capabilities-grid'>
                   <h1>Channel Capabilities</h1>
                   <p className='intro'>
                       The Smooch API gives you access to the richest features across the broadest set of messaging channels. This comparison grid provides a comprehensive view of feature support across all available channel. Notice that support level may vary based on channel as well as direction of the message (send or receive). For any question regarding our feature support, feel free to get in touch with us to discuss your use case.
                    </p>
                   <Header />
                   <SectionHeader>
                       Content types
                   </SectionHeader>
                   { this.generateRows(['text', 'image', 'location', 'gif', 'emoji']) }
                   <SectionHeader>
                       Action types
                   </SectionHeader>
                   { this.generateRows(['link', 'buy', 'postback', 'replies', 'locationRequest']) }
                   <SectionHeader>
                       Structured messages
                   </SectionHeader>
                   { this.generateRows(['compoundMessages', 'carousel']) }
                   <SectionHeader>
                       Indicators
                   </SectionHeader>
                   { this.generateRows(['typingIndicator', 'readIndicator', 'conversationStart']) }
                   <SectionHeader>
                       Account linking
                   </SectionHeader>
                   { this.generateRows(['webMessengerLinking']) }
                   <Legend />
               </div>;
    }
}
