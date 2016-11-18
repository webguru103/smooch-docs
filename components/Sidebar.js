import React, { Component } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { generateNavStructure } from '../utils/navigation';


export default class extends Component {
    render() {
        const navStructure = generateNavStructure(this.props.section);
        return <div className='sidebar'>
                   { navStructure.map((section) => {
                         return <ul className='list-unstyled'
                                    key={ section.title }>
                                    <li className='sidebar-page-title'>
                                        { section.title }
                                    </li>
                                    { section.pages.length > 0 ?
                                          <li>
                                              <ul className='list-unstyled'>
                                                  { section.pages.map(({path, title}) => {
                                                        return <li key={ path }
                                                                   className='sidebar-section-title'>
                                                                   <Link to={ prefixLink(path) }>
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
