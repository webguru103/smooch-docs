import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Sidebar from './Sidebar';

export default class extends Component {
    render() {
        const {section} = this.props;
        return <Grid>
                   <Row>
                       <Col xsHidden
                            sm={ 4 }
                            md={3}>
                       <Sidebar section={ section } />
                       </Col>
                       <Col xs={ 12 }
                            sm={ 8 }
                            mdOffset={ 1 }
                            md={ 7 }
                            className='content'>
                       { this.props.children }
                       </Col>
                   </Row>
               </Grid>;
    }
}
