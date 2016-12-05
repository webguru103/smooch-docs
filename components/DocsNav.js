import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';


export default class extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired
    };

    render() {
        const {route: {path: currentPath}} = this.props;

        const links = [
            ['Docs', '/docs/', true],
            ['API Reference', '/rest/', false],
            ['Channels', '/docs/native-sdks/', true],
            ['Changelog', '/changelog/', true],
            ['FAQs', '/docs/faq/', true]
        ];

        const hasActiveLink = links.some(([_, href]) => currentPath === href); // eslint-disable-line no-unused-vars

        const navItems = links.map(([label, href, isInternal] , index) => {
            if (isInternal) {
                const isActive = href === '/docs/' ?
                    !hasActiveLink || currentPath === href :
                    currentPath === href;

                return <LinkContainer to={ href }
                                      active={ isActive }
                                      key={ index }>
                           <NavItem eventKey={ index }>
                               { label }
                           </NavItem>
                       </LinkContainer>;
            }

            return <NavItem eventKey={ index }
                            key={ index }
                            href={ href }>
                       { label }
                   </NavItem>;
        });

        return <Navbar inverse
                       className='hidden-xs navbar-docs'>
                   <Nav>
                       { navItems }
                   </Nav>
               </Navbar>;
    }
}
