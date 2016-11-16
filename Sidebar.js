import React, { Component } from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../utils/typography';
import { generateNavStructure } from '../utils/navigation';


export default class extends Component {
    render() {
        const {section} = this.props;
        const navStructure = generateNavStructure(section);
        return <Container style={ { maxWidth: 960, paddingTop: 0, padding: `${rhythm(1)} ${rhythm(3/4)}`, background: 'lightgray' } }>
                   { navStructure.map((section) => {
                         return <ul>
                                    <li>
                                        <Link to={ prefixLink(section.path) }>
                                        { section.title }
                                        </Link>
                                    </li>
                                    { section.anchors.length > 0 ?
                                          <li>
                                              <ul>
                                                  { section.anchors.map(({id, title}) => {
                                                        return <li>
                                                                   <a href={ prefixLink(`${section.path}#${id}`) }>
                                                                       { title }
                                                                   </a>
                                                               </li>;
                                                    }) }
                                              </ul>
                                          </li> : null }
                                </ul>;
                     }) }
               </Container>;
    }
}
