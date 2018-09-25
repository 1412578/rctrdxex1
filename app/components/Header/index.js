import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Icon from './Icon';

/* eslint-disable react/prefer-stateless-function */
class Header extends React.Component {
  handleSelectNavBar = (eventKey) =>{
    switch (eventKey){
      case 1:
        this.props.changeURL("/new");        
        break;
      case 2:
        this.props.changeURL("/chart");
        break;
      case 3: this.props.changeURL("/chart2");
        break;
      default:
        break;
    }
  }
  render() {
    const { handleLogout } = this.props;
    return (
      <Navbar fluid staticTop onSelect={this.handleSelectNavBar}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ABC</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>Create new diagram</NavItem>
        </Nav>
        <Nav>
          <NavItem eventKey={2}>Rechart</NavItem>
        </Nav>
        <Nav>
          <NavItem eventKey={3}>React-chartjs</NavItem>
        </Nav>
        <Nav>
          <input type="text" placeholder="...diagrams" className="search"/>
        </Nav>
        <Nav pullRight>
          <NavDropdown title={this.props.username} id="dropdown">
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
