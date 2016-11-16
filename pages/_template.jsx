import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import 'styles/markdown-styles';
import 'styles/main';

import Header from '../components/Header';

export default class extends Component {
    static propTypes = {
        children: React.PropTypes.any
    };

    render() {
        return <div>
                   <Header />
                   <Container style={ { maxWidth: 960 } }>
                       { this.props.children }
                   </Container>
               </div>;
    }
}
