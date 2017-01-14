import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { generateNavStructure } from '../utils/navigation';

export default class extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        section: PropTypes.string.isRequired
    };

    render() {
        const {route: {path: currentPath}} = this.props;

        const links = [
            ['Guide', '/guide/', true],
            ['API Reference', '/rest/', false],
            ['Channels', '/guide/channel-capabilities/', true],
            ['Changelog', '/changelog/', true, ['hidden-sm']],
            ['FAQs', '/faq/', true]
        ];

        const hasActiveLink = links.some(([_, href]) => currentPath === href); // eslint-disable-line no-unused-vars

        const navItems = links.map(([label, href, isInternal, classNames=[]] , index) => {
            if (isInternal) {
                const isActive = href === '/guide/' ?
                    !hasActiveLink || currentPath === href :
                    currentPath === href;

                return <LinkContainer to={ href }
                                      active={ isActive }
                                      key={ index }
                                      className={ classNames.join(' ') }>
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

        const docsNavStructure = generateNavStructure(this.props.section);

        docsNavStructure.forEach((section, i) => {
            const subitems = section.pages.filter((p) => p).map(({path, title, internal} , j) => {
                return internal ?
                    <LinkContainer to={ path }
                                   key={ 7.1 + i + 0.1 * j }>
                        <MenuItem eventKey={ 7.1 + i + 0.1 * j }>
                        { title }
                        </MenuItem>
                    </LinkContainer> :
                    <MenuItem eventKey={ 7.1 + i + 0.1 * j }
                              key={ path }
                              href={ path }>
                    { title }
                    </MenuItem>;
            });

            const item = <NavDropdown eventKey={ 7 + i }
                                      key={ 7 + i }
                                      title={ section.title }
                                      ref={ section.title }
                                      className='visible-xs'
                                      id='doc-nav'>
                             { subitems }
                         </NavDropdown>;

            navItems.push(item);
        });


        return <Navbar className='navbar-site'>
                   <Navbar.Header>
                       <Navbar.Brand>
                           <a href='https://smooch.io'><img src={ require('images/smooch_logo.svg') }
                                                            className='full-logo hidden-sm'
                                                            alt='Smooch logo' /><img src={ require('images/smooch_icon_logo.png') }
                                                                                                                                              className='logo-only visible-sm-inline'
                                                                                                                                              alt='Smooch logo' /></a>
                       </Navbar.Brand>
                       <Navbar.Toggle />
                   </Navbar.Header>
                   <Navbar.Collapse>
                       <Nav>
                           { navItems.map((c, i) => React.cloneElement(c, {
                                 key: i
                             })) }
                       </Nav>
                       <Nav pullRight>
                           <NavItem eventKey={ 7 + docsNavStructure.length + 1 }
                                    href='https://smooch.io/help'>
                               Help
                           </NavItem>
                           <NavItem eventKey={ 7 + docsNavStructure.length + 2 }
                                    href='https://app.smooch.io/login'
                                    className='sign-in'>
                               Sign in
                           </NavItem>
                       </Nav>
                   </Navbar.Collapse>
               </Navbar>;
    }
}
