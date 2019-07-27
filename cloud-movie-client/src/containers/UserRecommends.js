import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';
import { Carousel } from 'react-bootstrap';
import ProfilePage from './ProfilePage';
import MovieList from './MovieList';
import { getMovies } from '../actions/movies';

const UserRecommends = ({
  loading,
  userLikes,
  dramaList,
  scifiList,
  mysteryList,
  documentaryList,
  getMovies
}) => {
  const randomize = list => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list[0];
  };
  const recommended = () => {
    let randomGen;
    let movieGenList;
    let randomMovies = [];
    let randomLike;
    let randomMovie;
    if (userLikes.length > 0) {
      let count = 0;

      while (randomMovies.length < 3 || count < 3) {
        randomLike = randomize(userLikes);
        randomGen = randomLike.genre;
        movieGenList = eval(randomGen + 'List');
        randomMovie = randomize(movieGenList);

        if (randomMovie === randomLike || randomMovies.includes(randomMovie)) {
          continue;
        } else {
          randomMovies.push(randomMovie);
        }
        count++;
      }
    }
    return randomMovies;
  };
  var rec = recommended();
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Recommended</h1>
      {rec.length > 0 ? (
        <div className='carouselContainer' style={{ width: '400px' }}>
          <Carousel>
            {rec.map(movie => (
              <Carousel.Item key={movie.id}>
                <img
                  className='d-block w-100'
                  src={require('./imgs/horrorTwo.jpg')}
                />
                <Carousel.Caption>
                  <h3>{movie.title}</h3>
                  <h6>{movie.genre}</h6>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <h4>No Recomendations!</h4>
      )}
    </Fragment>
  );
};

UserRecommends.propTypes = {
  dramaList: PropTypes.array.isRequired,
  documentaryList: PropTypes.array.isRequired,
  scifiList: PropTypes.array.isRequired,
  mysteryList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userLikes: state.profile.userLikes,
  dramaList: state.movies.dramaList,
  documentaryList: state.movies.documentaryList,
  scifiList: state.movies.scifiList,
  mysteryList: state.movies.mysteryList,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getMovies }
)(UserRecommends);
