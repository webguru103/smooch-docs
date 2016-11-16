import React, { Component } from 'react';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { prefixLink } from 'gatsby-helpers';
import { Navbar, Nav, NavItem, } from 'react-bootstrap';


export default class extends Component {
    render() {
        return <Navbar>
                   <Nav>
                       <IndexLinkContainer to={prefixLink('/')}>
                           <NavItem eventKey={ 1 }
                                    href='#'>
                               Docs
                           </NavItem>
                       </IndexLinkContainer>
                       <LinkContainer to={ prefixLink('/api/') }>
                           <NavItem eventKey={ 1 }>
                               API Reference
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/channels/') }>
                           <NavItem eventKey={ 2 }>
                               Channels
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/changelog/') }>
                           <NavItem eventKey={ 3 }>
                               Changelog
                           </NavItem>
                       </LinkContainer>
                       <LinkContainer to={ prefixLink('/faq/') }>
                           <NavItem eventKey={ 4 }>
                               FAQs
                           </NavItem>
                       </LinkContainer>
                   </Nav>
               </Navbar>;
    }
}
