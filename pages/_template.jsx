import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import 'styles/markdown-styles';
import 'styles/main';

import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';

export default class extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return <div>
                   <SiteNav />
                   <DocsNav />
                   <Container style={ { maxWidth: 960 } }>
                       { this.props.children }
                   </Container>
               </div>;
    }
}
