import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieContext from './MovieContext';

export default function MovieProvider({ children }) {
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const store = {
    searchMovie,
    setSearchMovie,
    setSearchValue,
    searchValue,
  };

  return (
    <MovieContext.Provider value={ store }>
      {children}
    </MovieContext.Provider>
  );
}

MovieProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
