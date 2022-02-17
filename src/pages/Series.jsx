import React, { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import MovieContext from '../context/MovieContext';
import '../css/Movies.css';
import { fetchSeries } from '../services/SeriesAPI';

export default function Series() {
  const [popularSeries, setPopularSeries] = useState([]);
  const maxSeries = 10;
  const { searchMovie, searchValue } = useContext(MovieContext);

  const getSeries = async () => {
    if (searchMovie.length > 0) {
      setPopularSeries(searchMovie);
    } else {
      setPopularSeries(await fetchSeries());
    }
  };

  useEffect(() => {
    getSeries();
  }, [searchMovie]);

  console.log(searchValue);

  return (
    <div className="Movies">
      <Header title="Series" />
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
              name={ serie.title }
              ranking={ serie.vote_average }
              release={ serie.release_date }
              image={ serie.poster_path }
              id={ serie.id }
            />
          ))
        }
      </div>
    </div>
  );
}
