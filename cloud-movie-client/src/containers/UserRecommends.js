import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';
import { Carousel } from 'react-bootstrap';
import { getMovies } from '../actions/movies';
import './css/profile.css';

const UserRecommends = ({
  loading,
  userLikes,
  dramaList,
  scifiList,
  mysteryList,
  documentaryList,
  getMovies
}) => {
  useEffect(() => {
    getMovies('drama');
    getMovies('documentary');
    getMovies('scifi');
    getMovies('mystery');
  }, []);

  const randomize = list => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list[0];
  };

  const recommended = () => {
    let randomGen, randomLike, randomMovie;
    let movieGenList = [],
      likesIds = [],
      randomMovies = [];

    if (userLikes.length > 0) {
      var count = 0;
      for (let i = 0; i < userLikes.length; i++) {
        likesIds.push(userLikes[i].id);
      }

      while (randomMovies.length < 3) {
        randomLike = randomize(userLikes);
        randomGen = randomLike.genre;

        if (randomGen === 'drama') {
          movieGenList = dramaList;
        } else if (randomGen === 'scifi') {
          movieGenList = scifiList;
        } else if (randomGen === 'mystery') {
          movieGenList = mysteryList;
        } else if (randomGen === 'documentary') {
          movieGenList = documentaryList;
        }
        randomMovie = randomize(movieGenList);

        if (
          !randomMovies.includes(randomMovie, 0) &&
          !likesIds.includes(randomMovie.id, 0)
        ) {
          randomMovies.push(randomMovie);
        } else {
          if (count > 20) {
            break;
          } else {
            count += 1;
          }
          console.log(count);
        }
      }
    }
    return randomMovies;
  };

  var rec = recommended();
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h4 className='recTitle'>Your Recommended Movies</h4>
      {rec.length > 0 ? (
        <div className='carouselContainer' style={{ width: '450px' }}>
          <Carousel>
            {rec.map(movie => (
              <Carousel.Item key={movie.id}>
                <img
                  style={{ objectFit: 'fill' }}
                  className='d-block w-100'
                  style={{ width: '350px', height: '250px' }}
                  src={require('./imgs/' +
                    movie.genre +
                    '/' +
                    movie.title.replace(':', '') +
                    '.jpg')}
                />
                <Carousel.Caption
                  style={{ color: 'white', backgroundColor: 'black' }}
                >
                  <h3>{movie.title}</h3>
                  <h6>{movie.genre}</h6>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className='noRec'>
          <h4>No Recomendations!</h4>
        </div>
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
