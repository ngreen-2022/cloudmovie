import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../actions/profile';
import Spinner from './layout/Spinner';
import ProfileLikeItem from './ProfileLikeItem';
import { Carousel } from 'react-bootstrap';

const ProfilePage = ({ profile, loading, getCurrentProfile, userLikes }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h3>Welcome, {profile.name}</h3>
      {userLikes.length > 0 ? (
        <div className='carouselContainer' style={{ width: '400px' }}>
          <Carousel>
            {userLikes.map(like => (
              <Carousel.Item key={like.id}>
                <img
                  className='d-block w-100'
                  src={require('./imgs/horrorTwo.jpg')}
                />
                <Carousel.Caption>
                  <h3>{like.title}</h3>
                  <h6>{like.genre}</h6>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <h4>No Likes!</h4>
      )}
    </Fragment>
  );
};

ProfilePage.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  userLikes: state.profile.userLikes,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ProfilePage);
