import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const MovieItem = ({ title, genre, description, content }) => {
  const pickCardImg = () => {
    if (genre === 'horror') {
      return <Card.Img variant='top' src={require('./imgs/horrorTwo.jpg')} />;
    } else if (genre === 'drama') {
      return <Card.Img variant='top' src={require('./imgs/drama.jpeg')} />;
    } else if (genre === 'fantasy') {
      return <Card.Img variant='top' src={require('./imgs/fantasy.jpeg')} />;
    }
  };

  return (
    <div>
      <Card className='mb-2 mr-5' style={{ width: '18rem' }}>
        {pickCardImg()}
        <Card.Body>
          <Card.Title className='d-flex justify-content-between'>
            {title} <span> Rating: 4/5</span>
          </Card.Title>
          <Card.Text style={{ height: '9rem' }}>
            {description.length > 160
              ? description.substring(0, 160) + '...'
              : description}
          </Card.Text>
          <div>
            <Link
              className='btn btn-primary mr-4'
              to={{
                pathname: `/movie/${genre}/${title}`,
                state: { content, title }
              }}
            >
              Watch Now
            </Link>
            <Link to='/' className='btn btn-secondary'>
              More Info
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default MovieItem;
