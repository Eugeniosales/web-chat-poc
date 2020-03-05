import React, { Component } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from "reactstrap";

class Navegation extends Component {
    
    render(){
        return (    
            <div id="header">
                <Navbar color="light" light expand="md">
                    <NavbarBrand >
                        { this.props.title }
                    </NavbarBrand>
                        <Nav className="md" navbar>
                        <NavItem>
                            <NavLink href="/">
                            Login
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/public">
                            Aws Chat
                            </NavLink>
                        </NavItem>
                        </Nav>
                </Navbar>
            </div>
        );
    }
    
}

export default Navegation;