import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieItem from './MovieItem';
import PropTypes from 'prop-types';

const MovieSection = ({ list, sectionTitle }) => {
  return (
    <div>
      <Row>
        <h3 className='ml-3'>{sectionTitle}</h3>
      </Row>
      <Row>
        <Col className='d-flex flex-wrap flex-row'>
          {list.map(movie => (
            <MovieItem
              key={movie.title}
              genre={movie.genre}
              title={movie.title}
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
