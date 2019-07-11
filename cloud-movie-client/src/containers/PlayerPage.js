import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import Spinner from './layout/Spinner';
import { getHorror, getDrama, getFantasy } from '../actions/movies';

const PlayerPage = ({
  getHorror,
  getDrama,
  getFantasy,
  horrorList,
  dramaList,
  fantasyList,
  loading,
  match
}) => {
  const [movieData, setMovieData] = useState({
    genre: '',
    title: '',
    validUrl: false,
    pageLoad: true
  });

  useEffect(() => {
    setMovieData({
      ...movieData,
      genre: match.params.genre,
      title: match.params.title
    });
  }, []);

  const { genre, title, validUrl, pageLoad } = movieData;

  return (
    <Fragment>
      {genre} - {title}
    </Fragment>
  );
};

PlayerPage.propTypes = {
  horrorList: PropTypes.array.isRequired,
  dramaList: PropTypes.array.isRequired,
  fantasyList: PropTypes.array.isRequired,
  getHorror: PropTypes.func.isRequired,
  getDrama: PropTypes.func.isRequired,
  getFantasy: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  horrorList: state.movies.horrorList,
  dramaList: state.movies.dramaList,
  fantasyList: state.movies.fantasyList,
  loading: state.movies.loading
});

export default connect(
  mapStateToProps,
  { getHorror, getDrama, getFantasy }
)(PlayerPage);
