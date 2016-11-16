import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Sidebar from './Sidebar';

export default class extends Component {
    render() {
        const {section} = this.props;
        return <Grid>
                   <Row>
                       <Col xs={ 3 }>
                       <Sidebar section={ section } />
                       </Col>
                       <Col xs={ 9 }>
                       { this.props.children }
                       </Col>
                   </Row>
               </Grid>;
    }
}
