import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieItem from './MovieItem';
import PropTypes from 'prop-types';

const MovieSection = ({ list, sectionTitle }) => {
  return (
    <div className='container'>
      <Row className='panel panel-default'>
        <h1 className='panel-heading ml-3 my-4'>{sectionTitle}</h1>
      </Row>
      <Row>
        <Col className='d-flex flex-wrap flex-row'>
          {list.map(movie => (
            <MovieItem
              key={movie.id}
              id={movie.id}
              genre={movie.genre}
              title={movie.title}
              content={movie.content}
              description={movie.description}
            />
          ))}
        </Col>
      </Row>
      <Row />
    </div>
  );
};

MovieSection.propTypes = {
  list: PropTypes.array.isRequired,
  sectionTitle: PropTypes.string.isRequired
};

export default MovieSection;
