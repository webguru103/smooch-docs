import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { generateNavStructure } from '../utils/navigation';


export default class extends Component {
    static propTypes = {
        section: PropTypes.string.isRequired
    };

    generateSectionItems(pages) {
        return pages.map(({path, title, internal}) => {
            const link = internal ?
                <Link to={ path }>
                { title }
                </Link> :
                <a href={ path }>
                    { title }
                </a>;


            return <li key={ path }
                       className='sidebar-section-title'>
                       { link }
                   </li>;
        });
    }

    generateSections() {
        const navStructure = generateNavStructure(this.props.section);
        return navStructure
            .filter(({pages}) => pages.length > 0)
            .map(({title, pages}) => {
                return <ul className='list-unstyled'
                           key={ title }>
                           <li className='sidebar-page-title'>
                               { title }
                           </li>
                           <li>
                               <ul className='list-unstyled'>
                                   { this.generateSectionItems(pages) }
                               </ul>
                           </li>
                       </ul>;
            });
    }

    render() {
        return <div className='sidebar'>
                   { this.generateSections() }
               </div>;
    }
}
