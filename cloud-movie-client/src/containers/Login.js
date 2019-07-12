import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  const validateForm = () => {
    if (email.length > 0 && password.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/movielist' />;
  }

  return (
    <Fragment>
      <div className='Login'>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group controlId='email' size='lg'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type='email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </Form.Group>
          <Form.Group controlId='password' size='lg'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => onChange(e)}
              type='password'
              name='password'
            />
          </Form.Group>
          <Button block size='lg' disabled={!validateForm()} type='submit'>
            Login
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
