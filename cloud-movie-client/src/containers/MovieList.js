import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getMovies } from '../actions/movies';
import { loadProfile } from '../actions/profile';
import Spinner from './layout/Spinner';
import MovieSection from './MovieSection';
import './css/movieList.css';

const MovieList = ({
  horrorList,
  dramaList,
  documentaryList,
  scifiList,
  mysteryList,
  getMovies,
  loadProfile,
  loading
}) => {
  useEffect(() => {
    loadProfile();
    getMovies('drama');
    getMovies('documentary');
    getMovies('scifi');
    getMovies('mystery');
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div className='container'>
      <Container className='movieList'>
        <MovieSection list={dramaList} sectionTitle={'Drama'} />
        <MovieSection list={documentaryList} sectionTitle={'Documentary'} />
        <MovieSection list={scifiList} sectionTitle={'Science Fiction'} />
        <MovieSection list={mysteryList} sectionTitle={'Mystery'} />
      </Container>
    </div>
  );
};

MovieList.propTypes = {
  getMovies: PropTypes.func.isRequired,
  horrorList: PropTypes.array.isRequired,
  dramaList: PropTypes.array.isRequired,
  documentaryList: PropTypes.array.isRequired,
  scifiList: PropTypes.array.isRequired,
  mysteryList: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  horrorList: state.movies.horrorList,
  dramaList: state.movies.dramaList,
  documentaryList: state.movies.documentaryList,
  scifiList: state.movies.scifiList,
  mysteryList: state.movies.mysteryList,
  loading: state.movies.loading
});

export default connect(
  mapStateToProps,
  { getMovies, loadProfile }
)(MovieList);
