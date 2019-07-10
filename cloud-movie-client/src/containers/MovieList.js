import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getMovies } from '../actions/movies';
import Spinner from './layout/Spinner';
import MovieSection from './MovieSection';

const MovieList = ({
  horrorList,
  dramaList,
  fantasyList,
  getMovies,
  loading
}) => {
  useEffect(() => {
    getMovies('horror');
    getMovies('drama');
    getMovies('fantasy');
  }, [getMovies]);
  return loading ? (
    <Spinner />
  ) : (
    <Container className='movieList'>
      <MovieSection list={horrorList} sectionTitle={'Horror'} />
      <MovieSection list={dramaList} sectionTitle={'Drama'} />
      <MovieSection list={fantasyList} sectionTitle={'Fantasy'} />
    </Container>
  );
};

MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  horrorList: PropTypes.array.isRequired,
  dramaList: PropTypes.array.isRequired,
  fantasyList: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  horrorList: state.movies.horrorList,
  dramaList: state.movies.dramaList,
  fantasyList: state.movies.fantasyList,
  loading: state.movies.loading
});

export default connect(
  mapStateToProps,
  { getMovies }
)(MovieList);
