import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logout } from './actions/auth';
import { LinkContainer } from 'react-router-bootstrap';
import './containers/css/Navigation.css';

const Navigation = ({ isAuthenticated, logout }) => {
  const onLogout = () => {
    logout();
  };
  return (
    <Navbar
      collapseOnSelect
      className='navbar'
      expand='sm'
      style={{ backgroundColor: 'black' }}
    >
      <Navbar.Brand>
        <Link className='logo' style={{ textDecoration: 'none' }} to='/'>
          Omegaflix
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className='ml-md-auto'>
          {isAuthenticated ? (
            <div className='inner'>
              <Nav>
                <LinkContainer to='/movielist' style={{ color: '#829FFF' }}>
                  <Nav.Link eventKey='link-3'>
                    <i className='fas fa-ticket-alt' /> Movies
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/me' style={{ color: '#829FFF' }}>
                  <Nav.Link eventKey='link-4'>
                    <i className='fas fa-user' /> Profile
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link
                  eventKey='link-0'
                  onClick={onLogout}
                  style={{ color: '#829FFF' }}
                >
                  <i
                    className='fas fa-power-off'
                    style={{ color: '#829FFF' }}
                  />{' '}
                  Logout
                </Nav.Link>
              </Nav>
            </div>
          ) : (
            <div className='inner'>
              <Nav>
                <LinkContainer to='/signup' style={{ color: '#829FFF' }}>
                  <Nav.Link eventKey='link-1'>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login' style={{ color: '#829FFF' }}>
                  <Nav.Link eventKey='link-2'>Login</Nav.Link>
                </LinkContainer>
              </Nav>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { logout }
)(Navigation);
