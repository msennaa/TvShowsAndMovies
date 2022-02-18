import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import MovieContext from '../context/MovieContext';
import '../css/Details.css';
import { fetchMovieReview } from '../services/MoviesAPI';
import ReviewCard from '../components/ReviewCard';

export default function Details(props) {
  const { detailsMovie } = useContext(MovieContext);
  const [review, setReview] = useState([]);

  const getReview = async () => {
    const { match } = props;
    const { id } = match.params;
    setReview(await fetchMovieReview(id));
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <div className="Details">
      <div className="info">
        <div className="info-movie">
          <h1>{ detailsMovie.name }</h1>
          <h3>{`Release Date: ${detailsMovie.release}`}</h3>
        </div>
        <span>{`IMDB Rating: ${detailsMovie.ranking} ★`}</span>
      </div>
      <div className="overview">
        <img src={ `https://image.tmdb.org/t/p/w500${detailsMovie.image}` } alt="oi" />
        <div className="overview-container">
          <h1>Overview:</h1>
          <p>
            {detailsMovie.overview}
          </p>
        </div>
      </div>
      <div>
        {
          review.length > 0 ? (
            <h1 className="review">Reviews</h1>
          ) : (
            <h1 className="review">Movie without review</h1>
          )
        }
        {
          review.map((element, index) => (
            <ReviewCard
              key={ index }
              name={ element.author }
              content={ element.content }
              image={ element.author_details.avatar_path }
            />
          ))
        }
      </div>
    </div>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
