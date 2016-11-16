import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../utils/typography';


export default class extends Component {
    render() {
        return <Container style={ { maxWidth: 960, paddingTop: 0, padding: `${rhythm(1)} ${rhythm(3/4)}`, background: 'lightgray' } }>
                   <Link to={prefixLink('/')}>Docs</Link>
                   <Link to={prefixLink('/api/')}>API Reference</Link>
                   <Link to={prefixLink('/channels/')}>Channels</Link>
                   <Link to={prefixLink('/changelog/')}>Changelog</Link>
                   <Link to={prefixLink('/faq/')}>FAQs</Link>
               </Container>;
    }
}
