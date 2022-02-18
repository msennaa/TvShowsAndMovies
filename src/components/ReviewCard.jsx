import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import PropTypes from 'prop-types';
import avatar from '../images/avatar.png';
import '../css/ReviewCard.css';

export default function ReviewCard(props) {
  const { name, content, image } = props;
  const [src, setSrc] = useState('');
  const magicNumber = 60;

  const getAvatarImage = () => {
    if (image === null) {
      setSrc('');
    } else if (image.length > magicNumber) {
      const oi = image.substr(1);
      setSrc(oi);
    } else {
      setSrc(`https://image.tmdb.org/t/p/w500${image}`);
    }
  };

  useEffect(() => {
    getAvatarImage();
  }, []);

  return (
    <div className="ReviewCard">
      <div className="author">
        {
          src === '' ? (
            <img src={ avatar } alt="logo" />
          ) : (
            <img src={ src } alt="logo" />
          )
        }
        <h1>{name}</h1>
      </div>
      <div className="content">
        <p>{ content }</p>
      </div>
    </div>
  );
}

ReviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
