import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default class extends Component {
    render() {
        return <Navbar className='navbar-site'>
                   <Navbar.Header>
                       <Navbar.Brand>
                           <a href='https://smooch.io'><img src={ require('images/smooch_logo.svg') }
                                                            alt='Smooch logo' /></a>
                       </Navbar.Brand>
                       <Navbar.Toggle />
                   </Navbar.Header>
                   <Navbar.Collapse>
                       <Nav>
                           <NavItem eventKey={ 1 }
                                    href='https://smooch.io/is/'>
                               Product
                           </NavItem>
                           <NavItem eventKey={ 2 }
                                    href='https://smooch.io/is/'>
                               Features
                           </NavItem>
                           <NavItem eventKey={ 3 }
                                    href='https://app.smooch.io/integrations'>
                               Integrations
                           </NavItem>
                           <LinkContainer to='/'>
                               <NavItem eventKey={ 4 }>
                                   Docs
                               </NavItem>
                           </LinkContainer>
                           <NavItem eventKey={ 5 }
                                    href='https://app.smooch.io/customers'>
                               Customers
                           </NavItem>
                           <NavItem eventKey={ 6 }
                                    href='http://blog.smooch.io'>
                               Blog
                           </NavItem>
                       </Nav>
                       <Nav pullRight>
                           <NavItem eventKey={ 7 }
                                    href='https://app.smooch.io/login'>
                               Login
                           </NavItem>
                           <NavItem eventKey={ 8 }
                                    href='https://app.smooch.io/signup'>
                               Sign up
                           </NavItem>
                       </Nav>
                   </Navbar.Collapse>
               </Navbar>;
    }
}
