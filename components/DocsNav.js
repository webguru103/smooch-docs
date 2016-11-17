import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { prefixLink } from 'gatsby-helpers';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';


export default class extends Component {
    render() {
        return <Navbar inverse
                       className='hidden-xs navbar-docs'>
                   <Nav>
                       <LinkContainer to={ prefixLink('/docs/') }>
                           <NavItem eventKey={ 1 }
                                    href='#'>
                               Docs
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/api/') }>
                           <NavItem eventKey={ 1 }>
                               API Reference
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/docs/channels/') }>
                           <NavItem eventKey={ 2 }>
                               Channels
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/docs/references/#changelog') }
                                      active={ false }>
                           <NavItem eventKey={ 3 }>
                               Changelog
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/docs/references/#frequently-asked-questions') }
                                      active={ false }>
                           <NavItem eventKey={ 4 }>
                               FAQs
                           </NavItem>
                       </LinkContainer>
                   </Nav>
               </Navbar>;
    }
}
