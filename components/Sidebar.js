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
                                    <li className='sidebar-page-title'>
                                        <Link to={ prefixLink(section.path) }>
                                        { section.title }
                                        </Link>
                                    </li>
                                    { section.anchors.length > 0 ?
                                          <li>
                                              <ul className='list-unstyled'>
                                                  { section.anchors.map(({id, title}) => {
                                                        return <li key={ id }
                                                                   className='sidebar-section-title'>
                                                                   <Link to={ prefixLink(`${section.path}#${id}`) }>
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
