import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';

import Sidebar from './Sidebar';


export default class extends Component {
    render() {
        const {section} = this.props;
        return <Container style={ {    maxWidth: 960,    paddingTop: 0} }>
                   <Sidebar section={ section } />
                   { this.props.children }
               </Container>;
    }
}
