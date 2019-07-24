import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './layout/Spinner';
import { Carousel } from 'react-bootstrap';
import ProfilePage from './ProfilePage';
import MovieList from './MovieList';

const UserRecommends = ({
  loading,
  userLikes,
  horrorList,
  dramaList,
  fantasyList
}) => {
  const randomize = list => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return userLikes[0];
  };
  const recommended = () => {
    let randomGen;
    let movieGenList;
    if (userLikes.length > 0) {
      let randomLike = randomize(userLikes);

      randomGen = randomLike.genre;
      movieGenList = eval(randomGen + 'List');

      let randomMovie = randomize(movieGenList);
      //   while (randomMovie === randomLike) {
      //     randomMovie = randomize(movieGenList);
      //   }
      return randomMovie;
    } else {
      return null;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {recommended != null ? (
        <div>
          <h3>{recommended().title}</h3>
        </div>
      ) : (
        <h4>No Recomendations!</h4>
      )}
    </Fragment>
  );
};

UserRecommends.propTypes = {};

const mapStateToProps = state => ({
  userLikes: state.profile.userLikes,
  horrorList: state.movies.horrorList,
  dramaList: state.movies.dramaList,
  fantasyList: state.movies.fantasyList,
  loading: state.profile.loading
});

export default connect(mapStateToProps)(UserRecommends);
