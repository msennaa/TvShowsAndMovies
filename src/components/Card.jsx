import React from 'react';
import PropTypes from 'prop-types';
import '../css/Card.css';

export default function Card(props) {
  const { image, name, ranking } = props;
  return (
    <div className="Card">
      <img src={ `https://image.tmdb.org/t/p/w500${image}` } alt="oi" />
      <h3>{ name }</h3>
      <span>{`${ranking} ★`}</span>
    </div>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ranking: PropTypes.number.isRequired,
};
