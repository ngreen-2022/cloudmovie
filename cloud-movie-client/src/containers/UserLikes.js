import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/profile.css';

const UserLikes = ({ userLikes, profile }) => {
  return (
    <Fragment>
      <h4>Liked by You</h4>
      {userLikes.length > 0 ? (
        <div className='carouselContainer' style={{ width: '450px' }}>
          <Carousel>
            {userLikes.map(like => (
              <Carousel.Item key={like.id}>
                <img
                  className='d-block w-100'
                  style={{ width: '350px', height: '250px' }}
                  src={require('./imgs/' +
                    like.genre +
                    '/' +
                    like.title.replace(':', '') +
                    '.jpg')}
                />
                <Carousel.Caption
                  style={{
                    color: '#829FFF',
                    backgroundColor: 'black'
                  }}
                >
                  <div style={{ width: '246px' }}>
                    <Link
                      className='btn btn-primary mr-3'
                      to={{
                        pathname: `/watch/${like.id}`
                      }}
                    >
                      <span className='text-center'>Watch Now</span>
                    </Link>
                  </div>
                  <h3>{like.title}</h3>
                  <h6>{like.genre}</h6>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <h5>No Likes!</h5>
      )}
    </Fragment>
  );
};

UserLikes.propTypes = {};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  userLikes: state.profile.userLikes
});

export default connect(mapStateToProps)(UserLikes);
