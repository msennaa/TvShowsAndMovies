import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import MovieContext from '../context/MovieContext';
import '../css/Movies.css';
import { fetchSeries, fetchTvShowByGenre, genreTvShowList } from '../services/SeriesAPI';

export default function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const maxSeries = 15;
  const magicNumber = 12;
  const { searchMovie, searchValue } = useContext(MovieContext);

  const getSeries = async () => {
    if (searchMovie.length > 0) {
      setPopularSeries(searchMovie);
    } else {
      setPopularSeries(await fetchSeries());
    }
  };

  const getGenreList = async () => {
    setGenres(await genreTvShowList());
  };

  const filterByGenre = async (id) => {
    setPopularSeries(await fetchTvShowByGenre(id));
  };

  useEffect(() => {
    getSeries();
    getGenreList();
  }, [searchMovie]);

  console.log(popularSeries);

  return (
    <div className="Movies">
      <Header title="Series" />
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
          <h1>Popular Series</h1>
        )
      }
      <div className="movie-container">
        {
          popularSeries.slice(0, maxSeries).map((serie) => (
            <Card
              key={ serie.id }
              name={ serie.name }
              ranking={ serie.vote_average }
              release={ serie.first_air_date }
              image={ serie.poster_path }
              id={ serie.id }
              overview={ serie.overview }
              genre={ serie.genre_ids }
            />
          ))
        }
      </div>
    </div>
  );
}
