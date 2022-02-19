import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import MovieContext from '../context/MovieContext';
import '../css/Details.css';
import { fetchMovieDetails,
  fetchMovieReview,
  fetchMovieVideo,
} from '../services/MoviesAPI';
import ReviewCard from '../components/ReviewCard';

export default function Details(props) {
  const { detailsMovie } = useContext(MovieContext);
  const [review, setReview] = useState([]);
  const [details, setDetails] = useState({});
  const [video, setVideo] = useState([]);
  const history = useHistory();

  const getReview = async () => {
    const { match } = props;
    const { id } = match.params;
    setReview(await fetchMovieReview(id));
    setDetails(await fetchMovieDetails(id));
    setVideo(await fetchMovieVideo(id));
  };

  const filterTrailerMovie = () => {
    const result = video.filter((element) => element.type === 'Trailer')
      .map((element) => element.key);
    const trailer = result[0];
    if (!trailer) {
      return null;
    }
    const youtube = `https://www.youtube.com/embed/${trailer}`;
    return youtube;
  };

  const youtube = filterTrailerMovie();
  console.log(youtube);

  useEffect(() => {
    getReview();
  }, []);

  // const trailer = filterTrailerMovie();
  // // const youtube = `https://www.youtube.com/embed/${trailer.keys}`;
  // setYoutube(trailer.key);

  const generos = details.genres;
  // console.log(video);

  return (
    <div className="Details">
      <div className="info">
        <div className="info-movie">
          <h1>{ detailsMovie.name }</h1>
          <h3>{`Release Date: ${detailsMovie.release}`}</h3>
        </div>
        <button
          className="back"
          type="button"
          onClick={ () => history.push('/movies') }
        >
          Movies
        </button>
        <span>{`IMDB Rating: ${detailsMovie.ranking} ★`}</span>
      </div>
      <div className="overview">
        <img src={ `https://image.tmdb.org/t/p/w500${detailsMovie.image}` } alt="oi" />
        <div className="overview-container">
          <div className="genres-container">
            {
              generos && (
                generos.map((element, index) => (
                  <span className="genre" key={ index }>{element.name}</span>
                ))
              )
            }
          </div>
          <div className="paragraph-overview">
            <h1>Overview:</h1>
            <p>
              {detailsMovie.overview}
            </p>
          </div>
        </div>
      </div>
      <div className="trailer-container">
        {
          youtube && (
            <iframe
              src={ youtube }
              allowFullScreen
              title="video"
              className="video"
            />
          )
        }
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
