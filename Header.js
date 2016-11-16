import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import Headroom from 'react-headroom';

import SiteNav from '../components/SiteNav';
import DocsNav from '../components/DocsNav';
import { rhythm } from '../utils/typography';


export default class extends Component {
    render() {
        return <Headroom wrapperStyle={ { marginBottom: rhythm(1), } }>
                   <SiteNav/>
                   <DocsNav/>
               </Headroom>;
    }
}
