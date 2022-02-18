import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import MovieContext from '../context/MovieContext';
import '../css/Details.css';
import { fetchTvShowReview } from '../services/SeriesAPI';
import ReviewCard from '../components/ReviewCard';

export default function DetailsTvShow(props) {
  const { detailsTvShow } = useContext(MovieContext);
  const [review, setReview] = useState([]);

  const getReview = async () => {
    const { match } = props;
    const { id } = match.params;
    setReview(await fetchTvShowReview(id));
  };

  useEffect(() => {
    getReview();
  }, []);

  console.log(review);

  return (
    <div className="Details">
      <div className="info">
        <div className="info-movie">
          <h1>{ detailsTvShow.name }</h1>
          <h3>{`Release Date: ${detailsTvShow.release}`}</h3>
        </div>
        <span>{`IMDB Rating: ${detailsTvShow.ranking} ★`}</span>
      </div>
      <div className="overview">
        <img src={ `https://image.tmdb.org/t/p/w500${detailsTvShow.image}` } alt="oi" />
        <div className="overview-container">
          <h1>Overview:</h1>
          <p>
            {detailsTvShow.overview}
          </p>
        </div>
      </div>
      <div>
        {
          review.length > 0 ? (
            <h1 className="review">Reviews</h1>
          ) : (
            <h1 className="review">Without review</h1>
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

DetailsTvShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
