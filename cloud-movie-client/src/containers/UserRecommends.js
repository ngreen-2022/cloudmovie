import React, { Fragment, useEffect, useState } from 'react';
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
  fantasyList,
  scifiList,
  mysteryList,
  documentaryList,
  getMovies
}) => {
  const [state, setState] = useState({
    movie: null,
    recommendedList: []
  });

  const { recommendedList } = state;

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
      while (count < 5) {
        randomLike = randomize(userLikes);
        randomGen = randomLike.genre;
        movieGenList = eval(randomGen + 'List');
        randomMovie = randomize(movieGenList);
        if (!randomMovies.includes(randomMovie)) {
          randomMovies.push(randomMovie);
        } else {
          continue;
        }
        count++;
      }
      //todo: remove movie if it is in likes
      if (randomMovies.length > 0) {
        return randomMovies;
      }
    } else {
      return null;
    }
  };
  var rec = recommended();
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {rec != null ? (
        <div>
          <h1>Recomendations</h1>
          {rec.map(movie => (
            <h4> {movie.title}</h4>
          ))}
        </div>
      ) : (
        <h4>No recommendations</h4>
      )}
    </Fragment>
  );
};

UserRecommends.propTypes = {
  dramaList: PropTypes.array.isRequired,
  fantasyList: PropTypes.array.isRequired,
  documentaryList: PropTypes.array.isRequired,
  scifiList: PropTypes.array.isRequired,
  mysteryList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userLikes: state.profile.userLikes,
  dramaList: state.movies.dramaList,
  fantasyList: state.movies.fantasyList,
  documentaryList: state.movies.documentaryList,
  scifiList: state.movies.scifiList,
  mysteryList: state.movies.mysteryList,
  loading: state.profile.loading
});

export default connect(
  mapStateToProps,
  { getMovies }
)(UserRecommends);
