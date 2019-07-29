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
    let len = password.length >= 8;
    var regx = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)');

    let dig = new RegExp('(?=.*\\d)').test(password);
    let low = new RegExp('(?=.*[a-z])').test(password);
    let up = new RegExp('(?=.*[A-Z])').test(password);
    let spec = new RegExp('(?=.*\\W)').test(password);

    let check = regx.test(password);

    if (len === true) {
      document.getElementById('length').style.display = 'none';
    } else if (document.getElementById('length') !== null && len === false) {
      document.getElementById('length').style.display = 'list-item';
    }
    if (dig === true) {
      document.getElementById('number').style.display = 'none';
    } else if (document.getElementById('number') !== null && dig === false) {
      document.getElementById('number').style.display = 'list-item';
    }
    if (low === true) {
      document.getElementById('lower').style.display = 'none';
    } else if (document.getElementById('lower') !== null && low === false) {
      document.getElementById('lower').style.display = 'list-item';
    }
    if (up === true) {
      document.getElementById('upper').style.display = 'none';
    } else if (document.getElementById('upper') !== null && up === false) {
      document.getElementById('upper').style.display = 'list-item';
    }
    if (spec === true) {
      document.getElementById('special').style.display = 'none';
    } else if (document.getElementById('special') !== null && spec === false) {
      document.getElementById('special').style.display = 'list-item';
    }
    return (
      email.length > 0 &&
      len === true &&
      check === true &&
      password === confirmPassword
    );
  };

  if (isAuthenticated) {
    return <Redirect to='/movielist' />;
  }

  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={e => handleConfirmationSubmit(e)}>
        <Form.Group controlId='confirmationCode' size='lg'>
          <Form.Label style={{ color: '#1b3280', fontWeight: 'bold' }}>
            Confirmation Code
          </Form.Label>
          <Form.Control
            autoFocus
            type='tel'
            name='confirmationCode'
            value={confirmationCode}
            onChange={e => onChange(e)}
          />
          <Form.Text style={{ color: '#1b3280', fontWeight: 'bold' }}>
            Please check your email for the code.
          </Form.Text>
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
      <div className='container'>
        <div className='wrapper'>
          <div className='subForm'>
            <Form onSubmit={e => handleSubmit(e)}>
              <Form.Group controlId='email' size='lg'>
                <Form.Label style={{ color: '#1b3280', fontWeight: 'bold' }}>
                  Email
                </Form.Label>
                <Form.Control
                  autoFocus
                  type='email'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId='name' size='lg'>
                <Form.Label style={{ color: '#1b3280', fontWeight: 'bold' }}>
                  Name
                </Form.Label>
                <Form.Control
                  type='name'
                  name='name'
                  value={name}
                  onChange={e => onChange(e)}
                />
              </Form.Group>

              <Form.Group controlId='password' size='lg'>
                <Form.Label style={{ color: '#1b3280', fontWeight: 'bold' }}>
                  Password
                </Form.Label>
                <div classname='cDiv'>
                  <ul className='verifyList'>
                    <li
                      id='length'
                      style={{ display: 'list-item', listStyleType: 'circle' }}
                    >
                      8 Characters
                    </li>
                    <li
                      id='upper'
                      style={{ display: 'list-item', listStyleType: 'circle' }}
                    >
                      Uppercase Letter
                    </li>
                    <li
                      id='lower'
                      style={{ display: 'list-item', listStyleType: 'circle' }}
                    >
                      Lowercase Letter
                    </li>
                    <li
                      id='number'
                      style={{ display: 'list-item', listStyleType: 'circle' }}
                    >
                      Number
                    </li>
                    <li
                      id='special'
                      style={{ display: 'list-item', listStyleType: 'circle' }}
                    >
                      Special Character
                    </li>
                  </ul>
                </div>
                <Form.Control
                  type='password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId='confirmPassword' size='lg'>
                <Form.Label style={{ color: '#1b3280', fontWeight: 'bold' }}>
                  Confirm Password
                </Form.Label>
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container'>
      <div className='Signup'>
        {isOnConfirm === false ? renderForm() : renderConfirmationForm()}
      </div>
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
