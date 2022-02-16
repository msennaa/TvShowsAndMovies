import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../css/Header.css';
import { useState } from 'react/cjs/react.development';
import { fetchSearchMovie } from '../services/MoviesAPI';
import MovieContext from '../context/MovieContext';

export default function Header(props) {
  const { title } = props;
  const [input, setInput] = useState('');
  const { setSearchMovie, setSearchValue } = useContext(MovieContext);

  const searchMovie = async () => {
    setSearchMovie(await fetchSearchMovie(input));
    setSearchValue(input);
  };

  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="Header">
      <button onClick={ reload } type="button" className="title-button">
        {title}
      </button>
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
