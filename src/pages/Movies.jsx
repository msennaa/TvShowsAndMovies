import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import MovieContext from '../context/MovieContext';
import '../css/Movies.css';
import { fetchMovie, fetchMovieByGenre, genreList } from '../services/MoviesAPI';

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const maxMovies = 15;
  const { searchMovie, searchValue } = useContext(MovieContext);
  const magicNumber = 18;

  const getMovies = async () => {
    if (searchMovie.length > 0) {
      setPopularMovies(searchMovie);
    } else {
      setPopularMovies(await fetchMovie());
    }
  };

  const getGenreList = async () => {
    setGenres(await genreList());
  };

  const filterByGenre = async (id) => {
    setPopularMovies(await fetchMovieByGenre(id));
  };

  useEffect(() => {
    getMovies();
    getGenreList();
  }, [searchMovie]);

  return (
    <div className="Movies">
      <Header title="Movies" />
      <h1>Categories</h1>
      <div className="genre-container">
        {
          genres.slice(0, magicNumber).map((genre, index) => (
            <button
              className="category-buttons"
              key={ index }
              type="button"
              onClick={ () => filterByGenre(genre.id) }
            >
              {genre.name}
            </button>
          ))
        }
      </div>
      {
        searchMovie.length > 0 ? (
          <h1>{`Explore titles related to: "${searchValue}"`}</h1>
        ) : (
          <h1>Popular Movies</h1>
        )
      }
      <div className="movie-container">
        {
          popularMovies.slice(0, maxMovies).map((movie) => (
            <Card
              key={ movie.id }
              name={ movie.title }
              ranking={ movie.vote_average }
              release={ movie.release_date }
              image={ movie.poster_path }
              id={ movie.id }
            />
          ))
        }
      </div>
    </div>
  );
}
