import React from 'react';
import ReactPlayer from 'react-player';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Watch.css';
import NotFound from './NotFound';

const Watch = ({ location }) => {
  if (location.state === undefined) {
    return <Redirect to='/notfound' />;
  }

  const {
    state: { title, genre, description, content }
  } = location;

  return (
    <div>
      <div className='player-wrapper mt-4 mb-4'>
        <ReactPlayer
          className='react-player'
          url={content}
          width='100%'
          height='100%'
          playing={false}
          controls={true}
        />
      </div>
      <div className='container'>
        <h3 className='row ml-1 mt-4 mb-4'>
          {title}
          <h4>
            <span className='ml-2 badge badge-info'> - {genre}</span>
          </h4>
          <hr style={{ width: '100%', color: 'grey' }} className='my-4' />
          <p className='small'>{description}</p>
        </h3>
      </div>
    </div>
  );
};

Watch.propTypes = {};

export default Watch;
