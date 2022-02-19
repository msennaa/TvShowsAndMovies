import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import MovieContext from '../context/MovieContext';
import '../css/Details.css';
import { fetchTvShowDetails,
  fetchTvShowReview,
  fetchTvVideo,
} from '../services/SeriesAPI';
import ReviewCard from '../components/ReviewCard';

export default function DetailsTvShow(props) {
  const { detailsTvShow } = useContext(MovieContext);
  const [review, setReview] = useState([]);
  const [details, setDetails] = useState({});
  const [video, setVideo] = useState([]);
  const history = useHistory();

  const getReview = async () => {
    const { match } = props;
    const { id } = match.params;
    setReview(await fetchTvShowReview(id));
    setDetails(await fetchTvShowDetails(id));
    setVideo(await fetchTvVideo(id));
  };

  const filterTrailerTvShow = () => {
    const result = video.filter((element) => element.type === 'Trailer')
      .map((element) => element.key);
    const trailer = result[0];
    if (!trailer) {
      return null;
    }
    const youtube = `https://www.youtube.com/embed/${trailer}`;
    return youtube;
  };

  const anotherVideo = () => {
    if (video.length > 1) {
      const result = video.map((element) => element.key);
      const trailer = result[0];
      const youtube = `https://www.youtube.com/embed/${trailer}`;
      return youtube;
    }

    const result = video.map((element) => element.key);
    const youtube = `https://www.youtube.com/embed/${result}`;
    return youtube;
  };

  const secondVideo = anotherVideo();

  const youtube = filterTrailerTvShow();

  useEffect(() => {
    getReview();
  }, []);

  const generos = details.genres;

  console.log(generos);

  return (
    <div className="Details">
      <div className="info">
        <div className="info-movie">
          <h1>{ detailsTvShow.name }</h1>
          <h3>{`Release Date: ${detailsTvShow.release}`}</h3>
        </div>
        <button
          className="back"
          type="button"
          onClick={ () => history.push('/series') }
        >
          Series
        </button>
        <span>{`IMDB Rating: ${detailsTvShow.ranking} ★`}</span>
      </div>
      <div className="overview">
        <img src={ `https://image.tmdb.org/t/p/w500${detailsTvShow.image}` } alt="oi" />
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
              {detailsTvShow.overview}
            </p>
          </div>
        </div>
      </div>
      <div className="trailer-container">
        {
          youtube ? (
            <iframe
              src={ youtube }
              allowFullScreen
              title="video"
              className="video"
            />
          ) : (
            <iframe
              src={ secondVideo }
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
