import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, registerConfirm } from '../actions/auth';
import './css/Signup.css';

const Signup = ({ register, registerConfirm, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    confirmationCode: '',
    isOnConfirm: false
  });

  const {
    isOnConfirm,
    email,
    password,
    name,
    confirmPassword,
    confirmationCode
  } = formData;

  // Need to setup onSubmit
  const handleSubmit = e => {
    e.preventDefault();

    register({ email, name, password });

    setFormData({ ...formData, isOnConfirm: true });
  };

  const handleConfirmationSubmit = e => {
    e.preventDefault();

    registerConfirm({ email, name, password, confirmationCode });

    setFormData({ ...formData, isAuthenticated: true });
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateConfirmationForm = () => {
    return confirmationCode.length > 0;
  };

  const validateForm = () => {
    return (
      email.length > 0 && password.length > 0 && password === confirmPassword
    );
  };

  if (isAuthenticated) {
    return <Redirect to='/movielist' />;
  }

  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={e => handleConfirmationSubmit(e)}>
        <Form.Group controlId='confirmationCode' size='lg'>
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type='tel'
            name='confirmationCode'
            value={confirmationCode}
            onChange={e => onChange(e)}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
        </Form.Group>
        <Button
          block
          size='lg'
          disabled={!validateConfirmationForm()}
          type='submit'
        >
          Verify
        </Button>
      </Form>
    );
  };

  const renderForm = () => {
    return (
      <Form onSubmit={e => handleSubmit(e)}>
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
        <Form.Group controlId='name' size='lg'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='password' size='lg'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' size='lg'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={e => onChange(e)}
          />
        </Form.Group>
        <Button block size='lg' disabled={!validateForm()} type='submit'>
          Sign Up
        </Button>
      </Form>
    );
  };

  return (
    <div className='Signup'>
      {isOnConfirm === false ? renderForm() : renderConfirmationForm()}
    </div>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  registerConfirm: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { register, registerConfirm }
)(Signup);
