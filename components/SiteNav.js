import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';

import { rhythm } from '../utils/typography';


export default class extends Component {
    render() {
        return <Container style={ { maxWidth: 960, paddingTop: 0, padding: `${rhythm(1)} ${rhythm(3/4)}`, } }>
                   Smooch!
               </Container>;
    }
}
