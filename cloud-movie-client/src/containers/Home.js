import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  return (
    <div className='jumbotron justify-content-center align-self-center mt-4 mb-4'>
      <h1 className='display-4 text-center'>Omegaflix</h1>
      <p className='lead text-center'>Totally Legal Movies</p>
      <hr className='my-4' />
      <p className='text-center'>
        Stream On-Demand Video From Anywhere On Any Device
      </p>
      <div className='d-flex align-items-center justify-content-center'>
        <Link to='/signup' className='btn btn-success btn-lg mr-5'>
          Sign Up
        </Link>
        <Link
          to='/login'
          style={{ width: '105px' }}
          className='btn btn-secondary btn-lg'
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
