import React, { useState, useEffect, createRef, useRef } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { Card, Accordion } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Watch.css';
import Spinner from './layout/Spinner';
import { getMovieById } from '../actions/movies';

const Watch = ({ location, getMovieById, match, loading, movie }) => {
  // const [playerState, setPlayerState] = useState({
  //   playerRef: createRef()
  // });

  const playerR = useRef(null);

  useEffect(() => {
    getMovieById(match.params.id);
  }, []);

  // dismount useeffect
  useEffect(() => {
    return function cleanup() {
      // const currentTime = playerRef.getCurrentTime();
      // const movieId = match.params.id;
      localStorage.setItem('currentTime', playerR.current.getCurrentTime());
      localStorage.setItem('movieId', match.params.id);
    };
  }, []);

  if (location.state === undefined) {
    return <Redirect to='/notfound' />;
  }

  const {
    state: { title, genre, description }
  } = location;

  return loading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <div className='player-wrapper mt-4 mb-4'>
        <ReactPlayer
          ref={playerR}
          className='react-player'
          url={movie.content}
          width='100%'
          height='100%'
          playing={false}
          controls={true}
        />
      </div>
      <div className='container'>
        <div className='row ml-1 mt-4 mb-4'>
          <h4 className='font-weight-bold m-0'>{title}</h4>
          <h6>
            <span className='mt-2 ml-2 badge badge-info'> - {genre}</span>
          </h6>
          <hr style={{ width: '100%', color: 'grey' }} className='my-3' />
          <Accordion style={{ width: '100%' }}>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                <span className='font-weight-bold'>Synopsis</span>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body className='small'>{description}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

Watch.propTypes = {
  movie: PropTypes.object,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  movie: state.movies.movie,
  loading: state.movies.loading
});

export default connect(
  mapStateToProps,
  { getMovieById }
)(Watch);
