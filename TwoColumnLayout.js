import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';

import Sidebar from './Sidebar';
import { rhythm } from '../utils/typography';


export default class extends Component {
    render() {
        const {section} = this.props;
        return <Container style={ { maxWidth: 960, paddingTop: 0, padding: `${rhythm(1)} ${rhythm(3/4)}`, } }>
                   <Sidebar section={ section } />
                   { this.props.children }
               </Container>;
    }
}
