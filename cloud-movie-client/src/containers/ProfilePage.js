import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, loadProfile } from '../actions/profile';
import UserRecommends from './UserRecommends';
import UserLikes from './UserLikes';
import Spinner from './layout/Spinner';
import { Carousel } from 'react-bootstrap';
import './css/profile.css';

const ProfilePage = ({
  profile,
  loading,
  getCurrentProfile,
  loadProfile,
  userLikes
}) => {
  useEffect(() => {
    // loadProfile();
    getCurrentProfile();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='wrap'>
        <div className='likesCarouselContainer'>
          <UserLikes />
        </div>
        <div className='recsCarouselContainer'>
          <UserRecommends />
        </div>
      </div>
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
  { getCurrentProfile, loadProfile }
)(ProfilePage);
