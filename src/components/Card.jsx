import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MovieContext from '../context/MovieContext';
import '../css/Card.css';

export default function Card(props) {
  const { image, name, ranking, overview, release, id } = props;
  const { setDetailsMovie, setDetailsTvShow } = useContext(MovieContext);
  const history = useHistory();

  const submitInfo = () => {
    const newObj = {
      name,
      image,
      ranking,
      overview,
      release,
      id,
    };

    if (window.location.pathname === '/movies') {
      setDetailsMovie(newObj);
      history.push(`/movies/${id}`);
    } else {
      setDetailsTvShow(newObj);
      history.push(`/series/${id}`);
    }
  };

  return (
    <button type="button" className="Card" onClick={ submitInfo }>
      <img src={ `https://image.tmdb.org/t/p/w500${image}` } alt="oi" />
      <h3>{ name }</h3>
      <span>{`${ranking} ★`}</span>
    </button>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ranking: PropTypes.number.isRequired,
  overview: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
