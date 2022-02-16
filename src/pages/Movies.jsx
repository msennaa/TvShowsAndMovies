import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import MovieContext from '../context/MovieContext';
import '../css/Movies.css';
import { fetchMovie } from '../services/MoviesAPI';

export default function Movies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const maxMovies = 10;
  const { searchMovie, searchValue } = useContext(MovieContext);

  const getMovies = async () => {
    if (searchMovie.length > 0) {
      setPopularMovies(searchMovie);
    } else {
      setPopularMovies(await fetchMovie());
    }
  };

  useEffect(() => {
    getMovies();
  }, [searchMovie]);

  console.log(searchValue);

  return (
    <div className="Movies">
      <Header title="Movies" />
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
