import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Playground = props => {
  return (
    <div>
      <Link className='btn btn-primary'>Watch now</Link>
      <Link className='btn btn-secondary'>More Info</Link>
    </div>
  );
};

Playground.propTypes = {};

export default Playground;
