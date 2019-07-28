import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addMovieToLikes } from '../actions/profile';
import './css/movieItem.css';
import Spinner from './layout/Spinner';

const MovieItem = ({
  title,
  genre,
  description,
  id,
  likeIds,
  addMovieToLikes
}) => {
  const pickCardImg = () => {
    if (title === 'Know Your Enemy: Japan') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/documentary/Know Your Enemy Japan.jpg')}
        />
      );
    } else if (title === 'Last of the Mohicans') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/drama/Last of the Mohicans.jpg')}
        />
      );
    } else if (title === 'Oliver Twist') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/drama/Oliver Twist.jpg')}
        />
      );
    } else if (title === 'Men of the Forest') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/documentary/Men of the Forest.jpg')}
        />
      );
    } else if (title === 'The World at War') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/documentary/The World at War.jpg')}
        />
      );
    } else if (title === 'Four Sided Triangle') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/scifi/Four Sided Triangle.jpg')}
        />
      );
    } else if (title === 'Teenage Zombies') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/scifi/Teenage Zombies.jpg')}
        />
      );
    } else if (title === 'The Brain Eaters') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/scifi/The Brain Eaters.jpg')}
        />
      );
    } else if (title === 'The Death Kiss') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/mystery/The Death Kiss.jpg')}
        />
      );
    } else if (title === 'The Phantom of Crestwood') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/mystery/The Phantom of Crestwood.jpg')}
        />
      );
    } else if (title === 'The Voice From Beyond the Grave') {
      return (
        <Card.Img
          variant='top'
          src={require('./imgs/mystery/The Voice From Beyond the Grave.jpg')}
        />
      );
    }
  };

  const onClick = e => {
    e.preventDefault();

    addMovieToLikes([...likeIds, id]);
  };

  const onUnlike = e => {
    e.preventDefault();

    addMovieToLikes(likeIds.filter(toUnlike => toUnlike !== id));
  };

  return (
    <div>
      <Card className='mb-2 mr-5' style={{ width: '18rem' }}>
        {pickCardImg()}
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            {title} <span> Rating: 4/5</span>
          </Card.Title>
          <Card.Text style={{ height: '9rem' }}>
            {description.length > 160
              ? description.substring(0, 160) + '...'
              : description}
          </Card.Text>
          <div style={{ width: '246px' }}>
            <Link
              className='btn btn-primary mr-3'
              to={{
                pathname: `/watch/${id}`,
                state: { title, genre, description }
              }}
            >
              <span className='text-center'>Watch Now</span>
            </Link>
            {!likeIds.includes(id) ? (
              <Button onClick={e => onClick(e)} className='btn btn-secondary'>
                Add to Likes
              </Button>
            ) : (
              <Button
                style={{ width: '116px' }}
                onClick={e => onUnlike(e)}
                className='btn btn-danger'
              >
                Unlike
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  likeIds: state.profile.likeIds,
  loading: state.movies.loading,
  profileLoading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { addMovieToLikes }
)(MovieItem);
