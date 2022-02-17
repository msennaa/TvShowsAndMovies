import React from 'react';
import '../css/MainPage.css';
import { useHistory } from 'react-router-dom';
import image from '../images/mainImage.png';
import jason from '../images/jason.png';

export default function MainPage() {
  const history = useHistory();

  return (
    <div className="MainPage">
      <h1>Movies and TV Shows Database</h1>
      <div className="first-container">
        <img className="image" src={ image } alt="movies and tv shows logo" />
        <button type="button" onClick={ () => history.push('/series') }>
          SERIES
        </button>
        <button type="button" onClick={ () => history.push('/movies') }>
          MOVIES
        </button>
      </div>
      <hr />
      <div className="second-container">
        <button type="button">
          UPCOMING
        </button>
        <img className="jason" src={ jason } alt="movies and tv shows logo" />
      </div>
    </div>
  );
}
