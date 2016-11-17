import React, { Component } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { generateNavStructure } from '../utils/navigation';


export default class extends Component {
    render() {
        const {section} = this.props;
        const navStructure = generateNavStructure(section);
        return <div className='sidebar'>
                   { navStructure.map((section) => {
                         return <ul className='list-unstyled'
                                    key={ section.path }>
                                    <li>
                                        <Link to={ prefixLink(section.path) }
                                              className='sidebar-page-title'>
                                        { section.title }
                                        </Link>
                                    </li>
                                    { section.anchors.length > 0 ?
                                          <li>
                                              <ul className='list-unstyled'>
                                                  { section.anchors.map(({id, title}) => {
                                                        return <li key={ id }>
                                                                   <Link to={ prefixLink(`${section.path}#${id}`) }
                                                                         className='sidebar-section-title'>
                                                                   { title }
                                                                   </Link>
                                                               </li>;
                                                    }) }
                                              </ul>
                                          </li> : null }
                                </ul>;
                     }) }
               </div>;
    }
}
