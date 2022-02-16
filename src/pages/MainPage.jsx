import React from 'react';
import '../css/MainPage.css';
import image from '../images/mainImage.png';
import jason from '../images/jason.png';

export default function MainPage() {
  return (
    <div className="MainPage">
      <h1>Movies and TV Shows Database</h1>
      <div className="first-container">
        <img className="image" src={ image } alt="movies and tv shows logo" />
        <button type="button">
          SERIES
        </button>
        <button type="button">
          MOVIES
        </button>
      </div>
      <hr />
      <div className="second-container">
        <button type="button">
          ACTORS
        </button>
        <img className="jason" src={ jason } alt="movies and tv shows logo" />
      </div>
    </div>
  );
}
