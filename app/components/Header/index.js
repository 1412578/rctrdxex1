import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Icon from './Icon';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <Navbar fluid fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ABC</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>Create new diagram</NavItem>
        </Nav>
        <Nav pullRight>
          <NavDropdown title={this.props.username}>
            <MenuItem>
              <div className="media">
                <div className="media-left media-middle">
                  <Icon w={30} h={30}/>
                </div>
                <div className="media-body">
                  <h5 className="media-heading">Profile</h5>
                  <span>Lorem ipsum dolor sit.</span>
                </div>
              </div>
            </MenuItem>
            <MenuItem divider/>
            <MenuItem>
              <div onClick={handleLogout}>Logout</div>
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
