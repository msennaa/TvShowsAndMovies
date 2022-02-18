import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/Header.css';
import { useState } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import { fetchSearchMovie } from '../services/MoviesAPI';
import MovieContext from '../context/MovieContext';
import { fetchSearchSeries } from '../services/SeriesAPI';

export default function Header(props) {
  const { title } = props;
  const [input, setInput] = useState('');
  const { setSearchMovie, setSearchValue } = useContext(MovieContext);
  const history = useHistory();

  const searchMovie = async () => {
    if (window.location.pathname === '/series') {
      setSearchMovie(await fetchSearchSeries(input));
      setSearchValue(input);
      setInput('');
    } else {
      setSearchMovie(await fetchSearchMovie(input));
      setSearchValue(input);
      setInput('');
    }
  };

  const reload = () => {
    window.location.reload();
  };

  const redirect = () => {
    if (window.location.pathname === '/movies') {
      setSearchMovie([]);
      history.push('/series');
    } else {
      setSearchMovie([]);
      history.push('/movies');
    }
  };

  return (
    <div className="Header">
      <button onClick={ reload } type="button" className="title-button">
        {title}
      </button>
      {
        window.location.pathname === '/series' ? (
          <button
            onClick={ redirect }
            type="button"
            className="title-button"
          >
            Movies
          </button>
        ) : (
          <button
            onClick={ redirect }
            type="button"
            className="title-button"
          >
            Series
          </button>
        )
      }
      <div className="search-container">
        <input
          type="text"
          value={ input }
          name="input"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
        <button type="button" onClick={ searchMovie }>
          SEARCH
        </button>
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
