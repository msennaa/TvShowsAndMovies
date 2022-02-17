import React from 'react';
import PropTypes from 'prop-types';
import avatar from '../images/avatar.png';
import '../css/ReviewCard.css';

export default function ReviewCard(props) {
  const { name, content } = props;
  // const teste = 'https://secure.gravatar.com/avatar';
  // https://secure.gravatar.com/avatar/992eef352126a53d7e141bf9e8707576.jpg
  return (
    <div className="ReviewCard">
      <div className="author">
        <img src={ avatar } alt="logo" />
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
};
