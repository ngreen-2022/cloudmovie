import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import './css/Watch.css';

const Watch = ({ location }) => {
  return (
    <div>
      <h3 className='row h-100 justify-content-center align-self-center mt-4 mb-4'>
        {location.state.title}
      </h3>
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={location.state.content}
          width='100%'
          height='100%'
          playing={false}
          controls={true}
        />
      </div>
    </div>
  );
};

Watch.propTypes = {};

export default Watch;
